package com.nan.manager.controller;


import com.nan.manager.model.Employee;
import com.nan.manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController // This means that this class is a Controller
@RequestMapping(path="/") // This means URL's start with /demo (after Application path)
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    public EmployeeController(EmployeeService service) {
        this.employeeService = service;
    }


    @GetMapping("/")
    ResponseEntity<EntityModel<?>> Welcome(){
        return ResponseEntity.ok(
                new EntityModel<>(
                        linkTo(methodOn(EmployeeController.class).getAllStudents()).withRel("employees"))
        );
    }

    @PostMapping(path="/employees") // Map ONLY POST Requests
    public ResponseEntity<?> addNewStudent (Employee employee) {
        try{
            employeeService.saveEmployee(employee);
            EntityModel<Employee> studentResource = new EntityModel<>(employee,
                    linkTo(methodOn(EmployeeController.class).selectStudentById(employee.getId())).withSelfRel());

            return ResponseEntity
                    .created(new URI(studentResource.getRequiredLink(IanaLinkRelations.SELF).getHref()))
            .body(studentResource);

        } catch (URISyntaxException e) {
            return ResponseEntity.badRequest().body("Unable to create student " + employee.getId());
        }

        //return studentService.saveStudent(student);
    }

    /**
     * Update existing employee then return a Location header.
     *
     * @param newEmployee
     * @param id
     * @return
     */
    @PutMapping(path="/employees/{id}")
    ResponseEntity<?> alterStudent(Employee newEmployee, @PathVariable Integer id){
        try{
            employeeService.updateEmployee(newEmployee, id);
            Link newlyCreatedLink = linkTo(methodOn(EmployeeController.class).selectStudentById(id)).withSelfRel();

            return ResponseEntity.noContent().location(new URI(newlyCreatedLink.getHref())).build();
        }catch (URISyntaxException e){
            return ResponseEntity.badRequest().body(("Unable to update " + newEmployee));
        }
    }

    /**
     * Look up a single {@link Employee} and transform it into a REST resource. Then
     * return it through Spring Web's {@link ResponseEntity} fluent API.
     *
     * @param id
     */
    @GetMapping(path="/employees/{id}")
    ResponseEntity<EntityModel<Employee>>  selectStudentById(@PathVariable Integer id){
        return employeeService.findEmployeeById(id)
                .map(employee -> new EntityModel<>(employee, //
                        linkTo(methodOn(EmployeeController.class).selectStudentById(employee.getId())).withSelfRel(), //
                        linkTo(methodOn(EmployeeController.class).getAllStudents()).withRel("employees"))) //
                .map(ResponseEntity::ok) //
                .orElse(ResponseEntity.notFound().build());

    }

    @GetMapping(path="/employees/name/{name}")
    public  ResponseEntity<CollectionModel<EntityModel<Employee>>> selectStudentByName(@PathVariable String name){
        List<EntityModel<Employee>> students = StreamSupport.stream(employeeService.findEmployeeByName(name).spliterator(), false)
                .map(employee -> new EntityModel<>(employee,
                        linkTo(methodOn(EmployeeController.class).selectStudentById(employee.getId())).withSelfRel(),
                        linkTo(methodOn(EmployeeController.class).getAllStudents()).withRel("students")))
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new CollectionModel<>(students,
                        linkTo(methodOn(EmployeeController.class).selectStudentByName(name)).withSelfRel())
        );
        //return studentService.findStudentByName(name);
    }
    @DeleteMapping(path="/employees/{id}")
    public ResponseEntity<EntityModel<?>> deleteStudent(@PathVariable Integer id){
        employeeService.deleteEmployee(id);

        return ResponseEntity.ok(
                new EntityModel<>(
                        linkTo(methodOn(EmployeeController.class).getAllStudents()).withRel("students"))
        );

        //return studentService.deleteStudent(student.getId());
    }

    /**
     * Look up all students, and transform them into a REST collection resource.
     * Then return them through Spring Web's {@link ResponseEntity} fluent API.
     */

    @GetMapping(path="/employees")
    public ResponseEntity<CollectionModel<EntityModel<Employee>>> getAllStudents() {
        List<EntityModel<Employee>> students = StreamSupport.stream(employeeService.findAllEmployee().spliterator(), false)
                .map(employee -> new EntityModel<>(employee,
                        linkTo(methodOn(EmployeeController.class).selectStudentById(employee.getId())).withSelfRel(),
                        linkTo( methodOn(EmployeeController.class).getAllStudents()).withRel("students")))
                .collect(Collectors.toList());
        CollectionModel<EntityModel<Employee>>  CollectionModelStudents =   new CollectionModel<>(students,
                linkTo(methodOn(EmployeeController.class).getAllStudents()).withSelfRel());

        try{

            return ResponseEntity.ok(CollectionModelStudents);
        } catch (Exception e) {
            System.out.println("catch a exception");
            return ResponseEntity.badRequest().body((CollectionModelStudents));
        }

        //return studentService.findAllStudents();
    }

    // clear all cache using cache manager
    @DeleteMapping(path = "/cache")
    public @ResponseBody String clearCache() {
        for (String name : cacheManager.getCacheNames()) {
            cacheManager.getCache(name).clear();
        }

        return "clear cache successfully";
    }
}

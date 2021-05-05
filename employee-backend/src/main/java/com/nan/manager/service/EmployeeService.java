package com.nan.manager.service;

import com.nan.manager.model.Employee;
import com.nan.manager.respository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository repository){
        employeeRepository = repository;
    }

    @Transactional//(readOnly = true)
    // @Cacheable(value = "employees", key = "#ID")
    public Optional<Employee> findEmployeeById(Integer ID){
        return employeeRepository.findById(ID);
    }

    @Transactional//(readOnly = true)
    // @Cacheable(value = "employees", key = "#name")
    public Iterable<Employee> findEmployeeByName(String name) {
        return employeeRepository.findStudentByName(name);
    }

    @Transactional//(readOnly = true)
    // @Cacheable(value = "employees")
    public Iterable<Employee> findAllEmployee(){
        return employeeRepository.findAll();
    }

    @Transactional
    // @CacheEvict(value = "employees", allEntries = true)
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Transactional
    // @CacheEvict(value = "employees", allEntries = true)
    public String deleteEmployee(Integer id) {
        if(employeeRepository.existsById(id)){
            employeeRepository.deleteById(id);
            return "delete student " +id + " successfully";
        }
        return "student " + id + " is not exist";
    }

    @Transactional
    // @CacheEvict(value = "employees", allEntries = true)
    public Employee updateEmployee(Employee newEmployee, Integer id) {
        if(employeeRepository.existsById(newEmployee.getId())){
            employeeRepository.deleteById(newEmployee.getId());
            return employeeRepository.save(newEmployee);
        }
        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.deleteById(id);
                    return employeeRepository.save(newEmployee);
                }).orElseGet(()->{
                   newEmployee.setId(id);
                   return employeeRepository.save(newEmployee);
                });
    }
}


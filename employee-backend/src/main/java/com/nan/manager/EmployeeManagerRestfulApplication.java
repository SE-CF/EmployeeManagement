package com.nan.manager;

import com.nan.manager.model.Employee;
import com.nan.manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.server.core.EvoInflectorLinkRelationProvider;

import java.util.Collections;

@EnableCaching
@SpringBootApplication
public class EmployeeManagerRestfulApplication implements ApplicationRunner {

    public static void main(String... args) {
//        SpringApplication.run(StudentsManagerRestfulApplication.class, args);
        SpringApplication app = new SpringApplication(EmployeeManagerRestfulApplication.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
        app.run(args);
    }

    @Bean
    EvoInflectorLinkRelationProvider relProvider() {
        return new EvoInflectorLinkRelationProvider();
    }

    @Autowired
    private EmployeeService employeeService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        employeeService.saveEmployee(new Employee(1, "TianTian", "girl", "2001-02-07", "XinXiang", "Design"));
        employeeService.saveEmployee(new Employee(2, "Mr.Nan", "boy", "1999-05-05", "ShangQiu", "Technology"));
        employeeService.saveEmployee(new Employee(3, "WangLi", "female", "1995-02-19", "NanJing", "Manager"));
        employeeService.saveEmployee(new Employee(4, "Tom", "male", "1998-09-02", "the United States", "Diplomacy"));
    }
}

package com.nan.manager.respository;

import org.springframework.data.jpa.repository.Query;
import com.nan.manager.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
    //@Modifying
    //通过name查询
    @Query("select st from Employee st where st.Name = ?1")
    Iterable<Employee> findStudentByName(String name);
}


package com.nan.manager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee implements Serializable{

    @Id
    @Column(name="id")
    private Integer id;

    @Column(name = "name")
    private String Name;

    @Column(name = "gender")
    private String Gender;

    @Column(name = "birthdate")
    private String BirthDate;

    @Column(name = "nativePlace")
    private String NativePlace;

    @Column(name = "department")
    private String Department;

    public String getName() {
        return Name;
    }

    public Integer getId() {
        return id;
    }

    public String getDepartment() {
        return Department;
    }

    public String getBirthDate() {
        return BirthDate;
    }

    public String getGender() {
        return Gender;
    }

    public String getNativePlace() {
        return NativePlace;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    public void setBirthDate(String birthDate) {
        BirthDate = birthDate;
    }

    public void setNativePlace(String nativePlace) {
        NativePlace = nativePlace;
    }

    public void setDepartment(String department) {
        Department = department;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

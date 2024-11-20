package com.microserviceone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microserviceone.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}

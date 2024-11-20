package com.microservicetwo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservicetwo.entity.EmployeeMicro;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/microservice-api")
public class MicroController {
	
	@Autowired
	RestTemplateBuilder restTemplateBuilder;
	
	@GetMapping("/get-all")
	public List<EmployeeMicro> getAll() {
		List<EmployeeMicro> responseEntity = new ArrayList<EmployeeMicro>();
		responseEntity = (List<EmployeeMicro>) restTemplateBuilder.build().getForObject("http://localhost:8091/employee/api/employees", List.class);

	
		//creating a new response bean and getting the response back and taking it into Bean
		return responseEntity;
	}
	
	

}

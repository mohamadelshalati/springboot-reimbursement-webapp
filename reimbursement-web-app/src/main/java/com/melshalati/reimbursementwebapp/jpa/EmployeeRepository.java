package com.melshalati.reimbursementwebapp.jpa;

import com.melshalati.reimbursementwebapp.models.employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    public Optional<Employee> findByEmail(String email);
}

package com.melshalati.reimbursementwebapp.models.employee;
import com.melshalati.reimbursementwebapp.jpa.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmployeeDaoService {
    private final EmployeeRepository employeeRepository;



    public Optional<Employee> getUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Employee> employee = employeeRepository.findByEmail(userDetails.getUsername());
        if(employee.isEmpty()) throw new UsernameNotFoundException(userDetails.getUsername());
        return employee;
    }

    public Employee save(Employee employee){
        Employee savedEmployee = null;
        try {
            savedEmployee = employeeRepository.save(employee);
        }catch (Exception e){
            throw new EmailAddressTaken("Someone already has this email address. Try another name");
        }
        return (savedEmployee);
    }
}

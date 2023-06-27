package com.melshalati.reimbursementwebapp.models.reimbursement;

import com.melshalati.reimbursementwebapp.jpa.EmployeeRepository;
import com.melshalati.reimbursementwebapp.jpa.ReimbursementRepository;
import com.melshalati.reimbursementwebapp.models.employee.Employee;
import com.melshalati.reimbursementwebapp.models.employee.Role;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ReimbursementDaoService {

    private final ReimbursementRepository reimbursementRepository;
    private final EmployeeRepository employeeRepository;
    private final Logger logger = LoggerFactory.getLogger(ReimbursementDaoService.class);

    public Reimbursement save(Reimbursement reimbursement){
        Optional<Employee> employee = getEmployee();
        if(employee.get().getRole() == Role.EMPLOYEE){
            Date date = new Date();
            reimbursement.setSubmitTime(new Timestamp(date.getTime()));
            reimbursement.setEmployee(employee.get());
            reimbursement.setReimbursementStatus(ReimbursementStatus.PENDING);
            return reimbursementRepository.save(reimbursement);
        }
        return null;
    }

    public List<Reimbursement> retrieveReimbursementsForAUser(){
        Optional<Employee> employee = getEmployee();
        if(employee.get().getRole() == Role.EMPLOYEE) {
            return reimbursementRepository.findAllReimbursementsByUser(employee.get().getId());
        }
        return null;
    }

    public List<Reimbursement> retrieveAllReimbursementsManager(){
        Optional<Employee> employee = getEmployee();
        if(employee.get().getRole() == Role.MANAGER) {
            return reimbursementRepository.findAll();
        }
        return null;
    }

    public void resolve(int id, boolean approved){
        Optional<Reimbursement> reimbursement = reimbursementRepository.findById(id);
        if(reimbursement.isEmpty()) return;
        if (approved) reimbursement.get().setReimbursementStatus(ReimbursementStatus.APPROVED);
        else reimbursement.get().setReimbursementStatus(ReimbursementStatus.DENIED);
        Date date = new Date();
        reimbursement.get().setResolveTime(new Timestamp(date.getTime()));
        reimbursementRepository.save(reimbursement.get());
    }

    private Optional<Employee> getEmployee() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Employee> employee = employeeRepository.findByEmail(userDetails.getUsername());
        if(employee.isEmpty()) throw new UsernameNotFoundException(userDetails.getUsername());
        return employee;
    }
}

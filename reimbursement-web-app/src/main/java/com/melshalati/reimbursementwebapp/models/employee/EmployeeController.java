package com.melshalati.reimbursementwebapp.models.employee;


import com.melshalati.reimbursementwebapp.models.reimbursement.Reimbursement;
import com.melshalati.reimbursementwebapp.models.reimbursement.ReimbursementDaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeDaoService employeeDaoService;
    private final ReimbursementDaoService reimbursementDaoService;


    @PostMapping("/reimbursement")
    public ResponseEntity<Employee> createReimbursement(@Valid @RequestBody Reimbursement reimbursement){
        Reimbursement saved = reimbursementDaoService.save(reimbursement);
        if(saved == null){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getTicketId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/reimbursements")
    public ResponseEntity<?> retrieveReimbursementsForAUser(){
        try{
            List <Reimbursement> employeeList = reimbursementDaoService.retrieveReimbursementsForAUser();
            if(!employeeList.isEmpty()){
                return ResponseEntity.ok(employeeList);
            }
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/manager/reimbursements")
    public ResponseEntity<?> retrieveAllReimbursementsManager(){
        try{
            List <Reimbursement> managerList = reimbursementDaoService.retrieveAllReimbursementsManager();
            if(!managerList.isEmpty()){
                return ResponseEntity.ok(managerList);
            }
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/manager/reimbursements/resolve/{id}/{approved}")
    public void resolve(@PathVariable int id,@PathVariable boolean approved){
        reimbursementDaoService.resolve(id, approved);
    }
}

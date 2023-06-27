# Springboot-reimbursement-webapp

### Project Description: 
Reimbursement-webapp allows employees to submit their reimburement requests which could be reviewed, approved, or denied by the finance manager.

### Technologies used:
  * Java 17
  * Spring Boot
  * Spring Security
  * JWT (JSON Web Token)
  * MySQL
  * JS, HTML, CSS
  * Jackson API
  * Fetch API
  * Jakarta
  * Tomcat
 
### Features:
  * One login page for both employee and finance manager, which will take each to two different pages.
  * Web app secured using Spring Security, and JWT.
  * Registration Page.
  * Finance managers have their own portal.
  * Finance manager has the choice to accept or reject a request. Status column will change accordingly.
  * Responsive and super neat design. 
  * Manager can sort reimbursement requests by status (pending, approved, denied).

### Getting Started
  1. Clone project.
  2. Create MySql database. 
  3. Enter your own MySql username and password inside [application.properties file]. Also change the name of the database in line 2 after jdbc:mysql://localhost:3306/[your mysql database name].

### Contributors:
  * [Mohamad Elshalati](https://github.com/mohamadelshalati/)
  
 # Images
 * Registration page.
 ![registration page](Images/registration%20page.jpg)
* Login page.
 ![login page](Images/login%20page.jpg)
* Employee A's list.
 ![employee_a_list](Images/emplyee%20a%20list.jpg)
* Employee B's reimbursement form.
 ![employee_b_form](Images/employee%20b%20reimbursement%20form.jpg)
* Manager A's list.
 ![manager_a_list](Images/manager%20a%20list.jpg)
* Manager A's list after taking action on couple reimbursements
![manager_response](Images/manager%20list%20after%20response.jpg)
* Manager A's filtered list (only Approved Reimbursements).
 ![manager_a_list_approved_filter](Images/approved%20filter.jpg)
* Employee B's list after manager's response.
 ![emplyee_b_denied](Images/emplyee%20b%20resolved%20denied.jpg)
* More Screenshots: [Images](Images/)



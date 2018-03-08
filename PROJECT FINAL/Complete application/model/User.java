/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Johanna
 */
@Entity
@XmlRootElement
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    @JsonManagedReference
    @OneToMany(mappedBy="owner")
    private List<Task> taskList;
    
    public User() {
    }

    public User(int id, String username, String firstname, String lastname, String email) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        taskList = new ArrayList();
    }
    
    public void addTask(Task t){
        this.taskList.add(t);
        if(t.getOwner() != this){
            t.setOwner(this);
        }
    }
    
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }
    
    @XmlTransient
    public List<Task> getTaskList() {
        return taskList;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setEmail(String email) {
        this.email = email;
    }
  
    public void setTaskList(List<Task> taskList) {
        this.taskList = taskList;
    }

    public void emptyTaskList() {
        this.taskList = new ArrayList();
    }

    
}

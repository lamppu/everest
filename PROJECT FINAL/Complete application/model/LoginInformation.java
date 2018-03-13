/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Johanna
 */

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;
import entity.User;

@Entity
@XmlRootElement
public class LoginInformation implements Serializable{
    @Id
    private String username;
    private String password;
    
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    public LoginInformation() {
    }

    public LoginInformation(String username, String password) {
        this.username = username;
        this.password = password;
        this.user = null;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    
    public User getUser() {
        return user;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
}

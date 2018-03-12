/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import model.LoginInformation;
import model.User;

/**
 *
 * @author Johanna
 */
@Stateless
@Path("entity.user")
public class UserFacadeREST extends AbstractFacade<User> {
    
    @PersistenceContext(unitName = "everestPU")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public User create(User entity) {
        if (!this.emptyValue(entity)) {
            if (this.uniqueUsername(entity.getUsername())) {
                return super.create(entity);
            }
        }
        return null;
    }

    private boolean uniqueUsername(String username) {
        List<User> users = super.findAll();
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return false;
            }
        }
        return true;
    }

    private boolean emptyValue(User entity) {
        if (entity.getUsername().isEmpty() || entity.getFirstname().isEmpty() || entity.getLastname().isEmpty() || entity.getEmail().isEmpty()) {
            return true;
        }
        return false;

    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, User entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @POST
    @Path("delete")
    @Produces(MediaType.TEXT_HTML)
    public String delete(@FormParam("id") Integer id) {
        this.remove(id);
        return "<script>window.sessionStorage.setItem('dltuser', 'success'); window.location.href = 'http://10.114.32.66:8080/Schedule/manager_page.html';</script>";
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public User find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<User> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}

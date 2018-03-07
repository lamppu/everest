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
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import model.LoginInformation;

/**
 *
 * @author Johanna
 */
@Stateless
@Path("model.logininformation")
public class LoginInformationFacadeREST extends AbstractFacade<LoginInformation> {

    @PersistenceContext(unitName = "everestPU")
    private EntityManager em;

    public LoginInformationFacadeREST() {
        super(LoginInformation.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public LoginInformation create(LoginInformation entity) {
        return super.create(entity);
    }
    
    @POST
    @Path("login/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public boolean login(@PathParam("id") String id, LoginInformation entity) {
        if (this.found(id)) {
            if (super.find(id).getPassword().equals(entity.getPassword())) {
                return true;
            } else {
                return false;
            }
            
        } else {
            return false;
        }
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") String id, LoginInformation entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public LoginInformation find(@PathParam("id") String id) {
        return super.find(id);
    }
    
    @GET
    @Path("found/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public boolean found(@PathParam("id") String id) {
        if (super.find(id) == null) {
            return false;
        }
        return true;
    }
    
    @POST
    @Path("pass/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public boolean password(@PathParam("id") String id, LoginInformation entity) {
        return this.find(id).getPassword().equals(entity.getPassword());
    }
    

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<LoginInformation> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<LoginInformation> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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

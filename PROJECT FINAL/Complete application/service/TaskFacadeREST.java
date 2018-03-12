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
import model.Task;
import model.User;

/**
 *
 * @author Johanna
 */
@Stateless
@Path("entity.task")
public class TaskFacadeREST extends AbstractFacade<Task> {

    @PersistenceContext(unitName = "everestPU")
    private EntityManager em;

    public TaskFacadeREST() {
        super(Task.class);
    }
/*
    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Task create(Task entity) {
        return super.create(entity);
    }*/
    @POST
    @Path("create")
    @Produces(MediaType.TEXT_HTML)
    public String createTask(@FormParam("task") String task, @FormParam("day") String day,
            @FormParam("start") int start, @FormParam("end") int end, @FormParam("ownerid") int ownerid){
        Task t = new Task(task, day, start, end, em.find(User.class, ownerid));
        super.create(t);
        super.edit(t);
        return "<script>window.sessionStorage.setItem('addtask', 'success'); window.location.href = 'http://10.114.32.66:8080/Schedule/manager_page.html';</script>";
    }
    
    @POST
    @Path("delUserTask")
    @Produces(MediaType.TEXT_HTML)
    public String delUserTask(@FormParam("ownerid") int id) {
        em.find(User.class, id).emptyTaskList();
        return "<script>window.sessionStorage.setItem('cleartasks', 'success'); window.location.href = 'http://10.114.32.66:8080/Schedule/manager_page.html';</script>";
    }
    
    @POST
    @Path("assignTask")
    @Produces(MediaType.TEXT_HTML)
    public String assignTask(@FormParam("taskid") int taskid, @FormParam("ownerid") int ownerid) {
        em.find(Task.class, taskid).setOwner(em.find(User.class, ownerid));
        return "<script>window.sessionStorage.setItem('assigntask', 'success'); window.location.href = 'http://10.114.32.66:8080/Schedule/manager_page.html';</script>";
    }
    
    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Task entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Task find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Task> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Task> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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

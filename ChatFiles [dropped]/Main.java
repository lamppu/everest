
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        /*ChatInterpreter ci = new ChatInterpreter(System.in, System.out);
        ci.run();*/
        
        ChatServer server = new ChatServer();
        server.serve();
    }
    
}

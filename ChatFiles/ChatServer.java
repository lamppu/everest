
import java.io.IOException;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;


class ChatServer {

    void serve() {
        try {
            ServerSocket ss = new ServerSocket(0);
            System.out.println("I have port " + ss.getLocalPort());
            
            while(true) {
                Socket s = ss.accept();
                /*System.out.println("Accepted connection from "+s);*/
                
                ServerThread st = new ServerThread(s);
                st.start();
                
            }
            
        } catch (IOException ex) {
            Logger.getLogger(ChatServer.class.getName()).log(Level.SEVERE, null, ex);
        }   
    }
    
    /*private static void handleSocket(Socket s) throws IOException {
        ChatInterpreter ci = new ChatInterpreter(
                        s.getInputStream(), new PrintStream(s.getOutputStream()));

    }*/
    
}

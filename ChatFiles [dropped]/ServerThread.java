
import java.io.IOException;
import java.io.PrintStream;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;


public class ServerThread extends Thread{
    private final Socket clientSocket;
    
    public ServerThread(Socket s){
        this.clientSocket = s;
    }
    
    @Override
    public void run(){
        try {
            ChatInterpreter ci = new ChatInterpreter(
                    this.clientSocket.getInputStream(), new PrintStream(this.clientSocket.getOutputStream()));
            ci.run();
        } catch (IOException ex) {
            Logger.getLogger(ServerThread.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

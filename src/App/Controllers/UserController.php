<?php 
namespace App\Controllers;

if (session_status() == PHP_SESSION_NONE) 
{
    session_set_cookie_params(3600);
    session_start();
}

class UserController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function GetAllUsers()
    {        
        try 
        {
            //Not returning Password
            $statement = $this->db->prepare("SELECT u.userID, u.username, u.createdAt FROM users AS u");
            $statement->execute();
            $result = $statement->fetchAll();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetNumUsers($limit)
    {        
        try 
        {
            //Not returning Password
            $statement = $this->db->prepare("SELECT u.userID, u.username, u.createdAt FROM users AS u LIMIT :num");
            $statement->bindParam(':num', $limit, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function GetUserByID($id)
    {        
        try 
        {
            //Not returning Password
            $statement = $this->db->prepare("SELECT u.userID, u.username, u.createdAt FROM users AS u WHERE id=:id");
            $statement->bindparam(":id", $id);   
            $statement->execute();
            $result = $statement->fetch();

            return $result;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public function UsernameExists($username)
    {
        try
        {
            $statement = $this->db->prepare("SELECT * FROM users WHERE username=:username"); 
            $statement->bindparam(":username", $username);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);

            if ($statement->rowCount() > 0)
            {
                return true;
            }

            return false;
        }
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    //------------------------------------------------------------------------------
    //
    // Move these functions into this class.
    //
    // And Implement checks...
    //
    //------------------------------------------------------------------------------

    // ToDo:
    // Check if username exsists before allowing a new register
    // Responses...
    public function Register($body)
    {
        $username = $body['username'];
        $hashed_password = password_hash($body['password'], PASSWORD_DEFAULT);
        
        $statement = $this->database->prepare("INSERT INTO users(username, password) 
        VALUES(:username, :password)");
        $statement->bindparam(":username", $username);
        $statement->bindparam(":password", $hashed_password);            
        $statement->execute(); 
    }

    // ToDo:
    // Better Response messages
    // + JWT Auth
    public function Login()
    {
        $statement = $this->db->prepare('SELECT * FROM users WHERE username=:username');
        $statement->bindparam(":username", $username);        
        $statement->execute(); 

        $user = $statement->fetch();
        if (password_verify($body['password'], $user['password'])) 
        {
            $_SESSION['loggedIn'] = true;
            $_SESSION['userID'] = $user['userID'];

            return true;
        }
        return false;
    }

    public function LogOut()
    {
        session_destroy();
    }

}

?>
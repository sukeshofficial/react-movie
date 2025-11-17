import '../css/LogIn.css'

function LogIn() {

    const googleLogin = () => {
        
    }
    const githubLogin = () => {
        window.location.href = "http://localhost:4001/auth/github";
    }

    return(
        <div className="auth">
            <h2>Welcome to the OAuth Demo</h2>
            <button onClick={googleLogin}>Login with Google</button>
            <button onClick={githubLogin}>Login with Github</button>
        </div>
    );
}

export default LogIn;
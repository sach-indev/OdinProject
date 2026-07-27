const error = document.getElementById("error");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

function validatePassword()
{
    if(password.value == "" || cpassword.value=="")
    {
        error.textContent = "";
        cpassword.setCustomValidity("");
    } 
    else if(password.value != cpassword.value)
    {
        error.textContent = "* Password do not match";
        cpassword.setCustomValidity("Password not matching");
    }
    else
    {
        cpassword.setCustomValidity("");
        error.textContent = "";
    }
}

password.addEventListener("input", validatePassword);
cpassword.addEventListener("input", validatePassword);
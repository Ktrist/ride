
export default function(token = '',action) {
  
    if(action.type == 'informationFromHomeScreen') {

        var newToken =action.token;
        console.log('Token from reducer from HomeScreen',newToken);
        return newToken;

    }
    if(action.type == 'informationFromSignUp') {

        var newToken =action.token;
        console.log('Token from reducer from SignUp',newToken);
        return newToken;

    }
    if(action.type == 'informationFromSellScreen') {

        var newToken =action.token;
        console.log('Token from reducer from SellScreen',newToken);
        return newToken;

    }
    if(action.type == 'informationFromSignIn') {

        var newToken =action.token;
        console.log('Token from reducer from SignIn',newToken);
        return newToken;
    }
    if(action.type == 'informationFromLogOut') {

        var newToken ='';
        console.log('Token from reducer',newToken);
        return newToken;
    }
    else 
    {    
        return token; 
    }
    
  }
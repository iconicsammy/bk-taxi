export default {

    tripCodeGenerator () {
        /*
        Generate a code for the trip

        @input void()

        @output: String.


        */


        var milliseconds = (new Date).getTime().toString();

        var rands=Math.floor(Math.random() * (2)) + 5

        return rands + milliseconds;

        
       
     
    }




};


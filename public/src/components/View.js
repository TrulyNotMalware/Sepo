
const newform = {
    template:`
    <div>
        <form :method="method" :action="action">
            <input>
            <input>
        <form>
    </div>
    `,
    props:{
        action:{
            type:String,
            required: true
        },
        method:{
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    }

};

var Modify = new Vue({
	el: "#modify",
	components:{
		newform	
	},
	data : {
		
	},

});


Vue.components('xinput',{
    template:`

    `,
    props:{

    },
    data() {
        return{

        }
    },
    methods:{

    }

});


const newform = {
    template:`
    <form :method="method" :action="action">
        <xinput></xinput>
        <input>
    <form>
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
    },
    methods:{

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

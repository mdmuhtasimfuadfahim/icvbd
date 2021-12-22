

export function updateForm(){
    /*---------------------
    Update A Form Operation
    ---------------------*/ 
    $("#update_form").submit(function(event){
        event.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var data = {}
    
        $.map(unindexed_array, function(n, i){
            data[n['name']] = n['value']
        })

        var request = {
            "url" : `http://localhost:3500/university/certificate/update/${data.id}`,
            "method" : "PUT",
            "data" : data
        }
    
        $.ajax(request).done(function(response){
            console.log(response)
            alert("Certificate Information Updated Successfully...!!!");
            location.reload();
        })
    })

/*----------------------------
Delete a Certificate Operation
----------------------------*/ 
if(window.location.pathname == "/university/certificate/table"){
    window.$ondelete = $(".table-wrapper .new-table .table-body .cell a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3500/university/certificate/delete/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do You want to Delete this Certificate...???")){
            $.ajax(request).done(function(response){
                alert("Certificate Information Deleted Successfully!");
                location.reload();
            })
        }

    })
}
}
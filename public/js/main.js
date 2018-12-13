console.log("js loaded")
const apiClient = axios.create()
const $list = $('#list')
const $toggle = $('.toggle')

const $addItemBtn = $('#form button')
const $bodyField = $('#body')
const $completedField = $('#completed')

apiClient({ method: 'get', url: '/api/todos' }).then((apiResponse) => {
    // after receiving data, loop through it, and append an <li>
    const todos = apiResponse.data
    // console.log(todos)
    console.log($list)
    todos.forEach((t) => {
        $list.append(`
            <li id="${t._id}">
                <div class="row">
                        <span class="lead col-3">${t.body}</span>
                    
                        <button type="button" class="btn btn-light completed col-3">${t.completed ? "completed" : "incomplete"}</button>
                   
                        <button class="btn btn-outline-dark delete col-3">X</button>
                </div>  
                
            </li> 
        `) 
    })
    
})

$addItemBtn.on("click", function() {
    const formData = {
        body: $bodyField.val(),
        completed: false
    }
    apiClient({ method: 'post', url: '/api/todos', data: formData}).then((apiResponse) => {
        let item = apiResponse.data;
        // console.log(item)
            $list.append(`
                <li id="${item._id}">
                    <div class="row">
                    <span class="lead col-3">${item.body}</span>
                        
                    <button type="button" class="btn btn-light completed col-3">${item.completed ? "completed" : "incomplete"}</button>
            
                    <button class="btn btn-outline-dark delete col-3">X</button>
                    </div>
                </li> 
            `) 
    })
})

$list.on('click', '.delete', function() {
    const todoId = $(this).parent().parent().attr('id')
    console.log($(this).parent().parent().attr('id'))
    // console.log(todoId)
    apiClient({ method: 'delete', url: `/api/todos/${todoId}`}).then((apiResponse) => {
        console.log(apiResponse)
        $('#' + todoId).fadeOut(function() {
            $(this).remove()
        })
    })
})

$list.on('click', '.completed', function() {
    const todoId = $(this).parent().parent().attr('id')
    console.log(todoId)
    apiClient({ method: 'patch', url: `/api/todos/${todoId}`}).then((apiResponse) => {
        console.log(apiResponse.data)
        $(this).text(apiResponse.data.todo.completed ? "Complete" : "Incomplete")
    })
})

$(function() {
    var socket = io('ws://localhost:8081')
        name = null ,
        src = '' ;
    $('#sendBtn').click(function(e){
        sendMessage();
        
    });
    $(document).keydown(function(e) {
        if (e.keyCode ==13) sendMessage();
    })

    $('#btn-two').click(function(e) {
        name = $('#input-account').val();
        src = $('#user-logo')[0].currentSrc;
       
        if (name) {
            socket.emit('login',{ "username": name, "src": src});
        } else {
            alert("请输入用户名!");
        }
    })

    socket.on('loginSuccess',function(data) {
        $('#login-page').hide();
        $('#chat-page').show();
    })

    socket.on('add',function(data) {
        let html = `<p class='system-upgrade'>系统提示:` + data.username + `进入聊天室</p>`;
        $('#content').append(html)
    })

    socket.on('loginFail',function(data) {
        alert("对不起，用户名已被使用!");
    })


    socket.on('receiveMsg',function(data) {
        let html = null;
        if (data.username==name) {
            html =`
            <div id='wrap-right'>
               <div class='item-right '> 
                   <span id='item-font'> 
                   ${ data.message }
                   </span>
                </div>
                <div class='item-img'>
                    <span>
                    : ${  data.username }
                    </span>
                    <img id='target-img' src=${ data.src}>
                </div>
            </div>`
        } else {
            html = 
        `<div id='wrap-left'>
            <div class='item-img'>
                 <img id='target-img' src=${ data.src}>
                 <span>
                  ${  data.username } :
                 </span>
                  
             </div>
            <div class='item-left '> 
                <span id='item-font'> 
                ${ data.message }
                </span>
             </div>
              
         </div>`
        }
        $('#content').append(html)
        
        
    })

  
    // })

    function sendMessage() {
        let val = $('#msg').val();
        $('#msg').val('');
        if (val) {
            socket.emit('sendMsg',{ "username": name, "message": val, "src": src});
        }
    }

})



$('#modal-img').click(function(e) {
    let event=e || window.event;
    let target=event.target||event.srcElement;
    $('#show>img').attr("src",target.src);
    alert("选择成功！");
});
 
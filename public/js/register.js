window.addEventListener('load', () => {
    $('#register_form').on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/register',
            data: formData,
            dataType: 'json',
            type: 'post',
            success: (data) => {
                if (data.status === 0) {
                    alert(`伺服器忙線中，請稍後再試`);
                } else if (data.status === 1) {
                    alert(`信箱或用戶名已被使用，請重新輸入後再試。`);
                } else if (data.status === 3) {
                    alert(`註冊成功！`);
                    window.location.href = '/';
                };
            }
        });
    });
})
window.addEventListener('load', () => {
    // 修改密碼
    $('#admin_form').on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/admin',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: (data) => {
                if (data.status === 5) {
                    alert('請重新確認修改的密碼');
                } else if (data.status === 3) {
                    alert('修改密碼成功');
                    window.location.href = '/';
                };
            }
        });
    });
});
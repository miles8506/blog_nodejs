window.addEventListener('load', () => {
    $('#login_form').on('submit', function (e) {
        // e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/login',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: (data) => {
                if (data.status === 0) {
                    alert(`伺服器忙線中`);
                } else if (data.status === 4) {
                    alert(`帳號密碼輸入有誤請重新查驗後再行登入`);
                } else if (data.status === 3) {
                    alert(`登入成功`);
                    window.location.href = '/';
                };
            }
        });
    });
});
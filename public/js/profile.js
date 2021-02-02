window.addEventListener('load', () => {
    $("#profile_form").on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            url: '/profile',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: (data) => {
                if (data.status === 3) {
                    alert('修改成功');
                    window.location.href = '/';
                }
            }
        });
        console.log(123);
    });
});
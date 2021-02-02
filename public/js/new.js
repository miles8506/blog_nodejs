window.addEventListener('load', () => {
    $("#new_form").on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/topics/new',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: (data) => {
                if (data.status === 5) {
                    alert(`請重新確認發文內容是否有遺漏部分`);
                } else if (data.status === 3) {
                    alert(`發文成功`);
                    window.location.href = '/';
                };
            }
        });
    });
});
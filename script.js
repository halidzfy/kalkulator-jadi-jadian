
    //  Menjalankan script JavaScript setelah seluruh elemen HTML pada halaman selesai dimuat. 
    document.addEventListener('DOMContentLoaded', function() {
        
        //  Mengambil elemen dari HTML: layar kalkulator, gambar status, dan semua tombol kalkulator agar bisa digunakan di JavaScript. 
        const display = document.getElementById('display');
        const statusImage = document.getElementById('statusImage');
        const buttons = document.querySelectorAll('.btn-calc');

        //  Menyimpan URL gambar untuk kondisi normal, sukses, dan error supaya bisa diganti sesuai keadaan kalkulator. 
        const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Halidazia Fidya Shandara (1710624125)';
        const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
        const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

        /**
          Mengganti gambar sesuai hasil perhitungan. Kalau hasilnya sukses, tampil gambar “Perhitungan Sukses”, dan kalau ada kesalahan, tampil gambar “Error Perhitungan.” 
         */
        function changeImage(state) {
            if (state === 'success') {
                statusImage.src = imgSuccess;
                statusImage.alt = "Perhitungan Sukses";
            } else if (state === 'error') {
                statusImage.src = imgError;
                statusImage.alt = "Error Perhitungan";
            } else {
                //  Mengganti gambar dan teks alternatif kembali ke tampilan normal kalau kondisinya bukan sukses atau error. 
                statusImage.src = imgNormal;
                statusImage.alt = "Status Kalkulator";
            }
        }

        /**
          Menghapus semua isi layar kalkulator dan mengembalikan gambar ke kondisi normal. 
         */
        function clearDisplay() {
            display.value = '';
            changeImage('normal'); // Memanggil function untuk merubah gambar
        }

        /**
          Menghapus satu karakter terakhir dari layar kalkulator. 
         */
        function deleteLastChar() {
            display.value = display.value.slice(0, -1);
        }

        /**
          Menambahkan angka atau simbol baru ke layar kalkulator saat tombol ditekan. 
         */
        function appendToDisplay(value) {
            display.value += value;
        }

        /**
          Menghitung hasil dari angka dan operasi yang ada di layar kalkulator. 
         */
        function calculateResult() {
            //  Mengecek jika layar kosong, maka muncul tulisan “Kosong!” dan gambar berubah ke error. 
            if (display.value === '') {
                changeImage('error');
                display.value = 'Kosong!';
                //  layar dibersihkan setelah 1,5 detik. 
                setTimeout(clearDisplay, 1500);
                return;
            }

            try {
                //  Menghitung isi layar kalkulator 
                let result = eval(display.value
                    .replace(/%/g, '/100') //  Mengubah tanda persen (%) menjadi pembagian 100 supaya bisa dihitung dengan benar. 
                ); 
                
                //  Menampilkan hasil ke layar dan mengganti gambar ke status sukses jika hasilnya valid.
                if (isFinite(result)) {
                    display.value = result;
                    changeImage('success'); //  Memunculkan pesan error jika hasil perhitungan tidak valid. 
                } else {
                    throw new Error("Hasil tidak valid");
                }

            } catch (error) {
                console.error("Error kalkulasi:", error);
                display.value = 'Error';
                changeImage('error'); //  Jika ada kesalahan dalam perhitungan, tampilkan pesan “Error” lalu ubah gambar ke error dan bersihkan layar setelah 1,5 detik. 
                setTimeout(clearDisplay, 1500);
            }
        }


        //  Memberi perintah agar setiap tombol kalkulator bisa bereaksi saat diklik. 
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');

                //  Menentukan tindakan berdasarkan tombol yang ditekan. 
                switch(value) {
                    case 'C':
                        //  Menghapus semua isi layar kalkulator. 
                        clearDisplay();
                        break;
                    case 'DEL':
                        //  Menghapus satu karakter terakhir dari layar. 
                        deleteLastChar();
                        break;
                    case '=':
                        //  Menghitung hasil perhitungan di layar. 
                        calculateResult();
                        break;
                    default:
                        //  Jika sebelumnya ada hasil sukses atau error, layar dibersihkan dulu sebelum menambah angka baru. 
                        if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                            clearDisplay();
                        }
                        appendToDisplay(value);
                        break;
                }
            });
        });

        //  Membuat kalkulator juga bisa digunakan lewat keyboard, bukan hanya klik tombol. 
        document.addEventListener('keydown', (e) => {
            const key = e.key;

            if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                    clearDisplay();
                }
                appendToDisplay(key);
                e.preventDefault();
            } else if (key === 'Enter' || key === '=') {
                calculateResult();
                e.preventDefault();
            } else if (key === 'Backspace') {
                deleteLastChar();
                e.preventDefault();
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                clearDisplay();
                e.preventDefault();
            }
        });

    });
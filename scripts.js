function openModal(id) { document.getElementById(id).classList.add('active'); }
        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        document.addEventListener('DOMContentLoaded', () => {
            const qrBox = document.getElementById("qrcode");
            if(qrBox) {
                new QRCode(qrBox, {
                    text: window.location.href,
                    width: 130,
                    height: 130,
                    colorDark : "#047857",
                    colorLight : "#ffffff"
                });
            }

            document.getElementById('btn-vcard').addEventListener('click', () => {
                const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:The Big Bang Carranga\nORG:The Big Bang Carranga\nTEL;TYPE=CELL:+573105591651\nNOTE:Agrupación musical de Carranga Profesional para todo tipo de eventos.\nEND:VCARD`;
                const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'The_Big_Bang_Carranga.vcf';
                a.click();
                URL.revokeObjectURL(url);
            });
        });

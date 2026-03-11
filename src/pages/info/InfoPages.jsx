import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, children }) => {
    const navigate = useNavigate();
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Geri Dön</span>
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-6">{title}</h1>
                <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const NasilKullanilir = () => (
    <PageLayout title="Site Nasıl Kullanılır?">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>Antigravity Dijital Akademi platformunu kullanmaya başlamak için aşağıdaki adımları izleyebilirsiniz:</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Hesabınızı Oluşturun</h2>
            <p>Platformdaki eğitimlere erişebilmek için sağ üst köşedeki "Kayıt Ol" butonuna tıklayarak ücretsiz hesabınızı oluşturun.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Eğitimleri Keşfedin</h2>
            <p>"Tüm Dersler" sayfasından ilgi alanınıza uygun eğitimleri filtreleyip inceleyebilirsiniz. İlginizi çeken bir eğitime tıklayarak detaylarını görebilirsiniz.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Eğitime Başlayın</h2>
            <p>Seçtiğiniz eğitime kayıt olduktan sonra Öğrenci Paneli üzerinden dersleri sırayla takip edebilir, ilerlemenizi görebilirsiniz.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Topluluğa Katılın</h2>
            <p>"Soru & Cevap" bölümünden takıldığınız yerleri sorabilir, diğer öğrencilerle tartışabilir ve bilgi alışverişinde bulunabilirsiniz.</p>
        </div>
    </PageLayout>
);

export const KVKK = () => (
    <PageLayout title="KVKK Aydınlatma Metni">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <p><strong>Kişisel Verilerin Korunması ve İşlenmesi Hakkında Aydınlatma Metni</strong></p>
            <p>Veri sorumlusu olarak Antigravity Dijital Akademi, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizin hukuka uygun olarak toplanması, saklanması ve paylaşılmasını sağlamak ve gizliliğinizi korumak amacıyla her türlü güvenlik önlemini almaktadır.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Hangi Verileriniz İşleniyor?</h2>
            <p>Ad, soyad, e-posta adresi, iletişim bilgileri, platform üzerindeki eğitim ilerlemeniz, yorumlarınız, ve log kayıtlarınız işlenmektedir.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz; platforma erişiminizin sağlanması, eğitim sürecinizin takibi, sertifikasyon süreçleri, sistem performansının izlenmesi ve kullanıcı deneyiminin geliştirilmesi amacıyla işlenmektedir.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Kişisel Veri Sahibinin Hakları</h2>
            <p>KVKK'nın 11. maddesi uyarınca veri sahipleri, kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme ve verilerin silinmesini veya yok edilmesini isteme hakkına sahiptir.</p>
        </div>
    </PageLayout>
);

export const SSS = () => (
    <PageLayout title="Sıkça Sorulan Sorular">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Eğitimlere nasıl kayıt olabilirim?</h2>
            <p className="mb-6">Üye olduktan sonra "Dersler" bölümünden dilediğiniz eğitime girip "Eğitime Katıl" butonuna tıklayarak eğitimlerinize başlayabilirsiniz.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Eğitimler ücretli mi?</h2>
            <p className="mb-6">Platformumuzda hem ücretsiz hem de premium (ücretli) eğitimler bulunmaktadır. Eğitim detay sayfalarında ilgili ücretlendirme açıkça belirtilmiştir.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Sertifika veriyor musunuz?</h2>
            <p className="mb-6">Evet, kursları %100 oranında tamamlayıp varsa değerlendirme sınavını başarıyla geçen öğrencilerimize dijital katılımcı/başarı sertifikası verilmektedir.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Hesabımı silebilir miyim?</h2>
            <p className="mb-6">Hesabınızı ayarlar bölümünden silebilirsiniz. Ancak bu işlem geri alınamaz ve tüm eğitim ilerlemeniz kalıcı olarak silinir.</p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Dersleri nerede ve nasıl izleyebilirim?</h2>
            <p className="mb-6">Cihaz fark etmeksizin (Bilgisayar, tablet veya mobil cihaz) internet bağlantısı olan her yerden hesabınıza giriş yaparak derslerinizi izleyebilirsiniz.</p>
        </div>
    </PageLayout>
);

export const GizlilikPolitikasi = () => (
    <PageLayout title="Gizlilik Politikası">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>Antigravity Dijital Akademi olarak kullanıcılarımızın haklarına saygı duyuyor ve platformumuzda geçirdiğiniz vakit boyunca gizliliğinizi korumaya odaklanıyoruz.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Bilgi Toplama ve Kullanım</h2>
            <p>Size daha iyi bir deneyim sunabilmek için giriş yapan kullanıcılarımızın e-posta adreslerini, isimlerini ve ilerleme kayıtlarını güvenli sunucularımızda saklıyoruz. Bu veriler üçüncü şahıslarla paylaşılmamaktadır.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Güvenlik</h2>
            <p>Kişisel bilgilerinizin ve şifrelerinizin güvenliği bizim için çok önemlidir. Hesap şifreleriniz şifrelenmiş (hash) olarak tutulur. İnternet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olmadığını ancak endüstri standardı güvenlik önlemlerini aldığımızı belirtmek isteriz.</p>
        </div>
    </PageLayout>
);

export const CerezPolitikasi = () => (
    <PageLayout title="Çerez Politikası">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>Size daha iyi bir deneyim sunmak ve platformu istikrarlı şekilde çalıştırabilmek için çerezleri ("cookies") kullanıyoruz.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Nedir bu çerezler?</h2>
            <p>Çerezler, ziyaret ettiğiniz web siteleri tarafından donanımınıza (bilgisayarınıza veya mobil cihazınıza) kaydedilen küçük veri dosyalarıdır. Bu dosyalar, sitenin sizi tanımasına yardımcı olur.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Ne Amaçla Kullanılır?</h2>
            <p><strong>1. Gerekli Çerezler:</strong> Oturumunuzun açık kalmasını sağlayan temel işlevler için zorunludur.</p>
            <p><strong>2. Performans ve Analiz:</strong> Hangi sayfaların ziyaret edildiğini anonim olarak analiz etmek ve platformu iyileştirmek için kullanılır.</p>
            <p>Tarayıcı ayarlarınızdan dilediğiniz zaman çerez kullanımını engelleyebilirsiniz; ancak bu durumda sitenin bazı özellikleri çalışmayabilir.</p>
        </div>
    </PageLayout>
);

export const KullanimSartlari = () => (
    <PageLayout title="Kullanım Şartları">
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>Web sitemize erişim sağlayarak ve hizmetlerimizi kullanarak bu şartları kabul etmiş sayılırsınız.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Hizmet Kapsamı ve Fikri Mülkiyet</h2>
            <p>Platform üzerinde sunulan içerikler, metinler, videolar, görseller ve kaynaklar fikri mülkiyet haklarıyla korunmaktadır. Eğitim içeriklerini izinsiz kopyalamak, indirmeye çalışmak veya üçüncü mecralarda dağıtmak yasaktır.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Üyelik Sorumlulukları</h2>
            <p>Hesabınızın güvenliği tamamen sizin sorumluluğunuzdadır. Tek bir hesap, başkalarıyla paylaşılamaz. Hesap paylaşımı veya kötü amaçlı kullanım tespit edildiğinde hesabınız askıya alınabilir.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Topluluk Kuralları</h2>
            <p>Topluluk ve soru-cevap bölümlerinde saygılı bir dil kullanmak zorunludur. Yanıltıcı, saldırgan veya reklam amaçlı içerikler yöneticiler tarafından uyarısız olarak silinecektir.</p>
        </div>
    </PageLayout>
);

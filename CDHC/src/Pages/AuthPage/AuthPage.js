import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios để gọi API

/*
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Cài đặt axios:
 * Mở terminal trong thư mục dự án frontend của bạn và chạy lệnh:
 * npm install axios
 *
 * 2. Cấu hình URL API:
 * Đảm bảo rằng biến `API_BASE_URL` dưới đây trỏ đúng đến địa chỉ server backend của bạn.
 * Nếu backend chạy ở cổng 5000, URL này đã chính xác.
 *
 * 3. Chạy ứng dụng:
 * Khởi động cả server backend và ứng dụng frontend React để chúng có thể giao tiếp với nhau.
 */

// Cấu hình URL cơ sở cho tất cả các yêu cầu API
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});


// CSS cho component (không thay đổi)
const styles = `
/* Main container */
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #581c87, #1e3a8a, #312e81);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  font-family: sans-serif;
}

/* ... (toàn bộ CSS từ phiên bản trước được giữ nguyên) ... */
.auth-form-container { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.2); padding: 2rem; transform: scale(1); transition: transform 0.3s ease; }
.auth-form-container:hover { transform: scale(1.02); }
.brand-section { text-align: center; margin-bottom: 2rem; }
.logo-container { display: inline-flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; background: linear-gradient(135deg, #ec4899, #8b5cf6); border-radius: 50%; margin-bottom: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.logo-icon { color: white; }
.brand-title { font-size: 1.875rem; font-weight: bold; color: white; margin-bottom: 0.5rem; }
.brand-subtitle { color: #c4b5fd; }
.auth-toggle { display: flex; margin-bottom: 2rem; background: rgba(255, 255, 255, 0.05); border-radius: 0.75rem; padding: 0.25rem; }
.toggle-btn { flex: 1; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; transition: all 0.3s ease; border: none; background: transparent; cursor: pointer; color: white; }
.toggle-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.1); }
.toggle-btn.active { background: white; color: #581c87; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); }
.form-fields { display: flex; flex-direction: column; gap: 1.25rem; }
.input-group { position: relative; }
.input-label { display: block; font-size: 0.875rem; font-weight: 500; color: #c4b5fd; margin-bottom: 0.5rem; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 0.75rem; color: #a78bfa; transition: color 0.3s ease; pointer-events: none; }
.input-wrapper:focus-within .input-icon { color: white; }
.form-input { width: 100%; padding: 0.75rem 2.5rem 0.75rem 2.5rem; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.5rem; color: white; font-size: 1rem; transition: all 0.3s ease; box-sizing: border-box; }
.form-input::placeholder { color: #a78bfa; opacity: 0.7; }
.form-input:focus { outline: none; border-color: #ec4899; box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.5); }
.password-toggle { position: absolute; right: 0.75rem; color: #a78bfa; background: transparent; border: none; cursor: pointer; transition: color 0.3s ease; padding: 0; display: flex; align-items: center; }
.password-toggle:hover { color: white; }
.submit-btn { width: 100%; background: linear-gradient(90deg, #ec4899, #8b5cf6); color: white; font-weight: 600; padding: 0.75rem 1.5rem; margin-top: 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); }
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
.auth-switch { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: #c4b5fd; }
.switch-btn { font-weight: 500; color: #f472b6; background: transparent; border: none; cursor: pointer; transition: color 0.3s ease; padding: 0; margin-left: 0.25rem; }
.switch-btn:hover { color: #fbbf24; text-decoration: underline; }
`;

// --- SVG Icon Components (không thay đổi) ---
const SparklesIcon = ({ className, size = 24 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-10.375A1 1 0 0 1 3.5 2H2" /> <path d="M14.063 8.5A2 2 0 0 0 15.5 9.937l10.375 6A1 1 0 0 1 22 16.938V21a1 1 0 0 1-1 1h-4.063a1 1 0 0 1-.937-.5z" /> <path d="M14 14l-4-4" /><path d="m2.5 15.5 10-10" /> </svg> );
const ShoppingBagIcon = ({ className, size = 24 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /> <path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /> </svg> );
const UserIcon = ({ className, size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" /> </svg> );
const MailIcon = ({ className, size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="20" height="16" x="2" y="4" rx="2" /> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /> </svg> );
const LockIcon = ({ className, size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg> );
const EyeIcon = ({ size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /> <circle cx="12" cy="12" r="3" /> </svg> );
const EyeOffIcon = ({ size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /> <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /> <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /> <line x1="2" x2="22" y1="2" y2="22" /> </svg> );


// --- AuthForm Component (CẬP NHẬT VỚI AXIOS) ---
const AuthForm = ({ isLogin, setIsLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false); // Thêm state loading

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { email, password } = formData;
            const res = await api.post('/auth/login', { email, password });

            // Lưu token vào localStorage để sử dụng cho các request sau này
            localStorage.setItem('userToken', res.data.data.token);
            
            alert(res.data.message); // "Đăng nhập thành công!"

            // Chuyển hướng đến trang chính sau khi đăng nhập thành công
            window.location.href = '/homepage'; 

        } catch (err) {
            // Lấy thông báo lỗi từ API response nếu có
            const message = err.response?.data?.message || "Lỗi kết nối server!";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }
        setLoading(true);
        try {
            const { name, email, password } = formData;
            const res = await api.post('/auth/register', { name, email, password });

            alert(res.data.message); // "Đăng ký thành công!"
            setIsLogin(true); // Tự động chuyển sang form đăng nhập

        } catch (err) {
            const message = err.response?.data?.message || "Lỗi kết nối server!";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <form
            className="auth-form-container"
            onSubmit={isLogin ? handleLogin : handleRegister}
        >
            <div className="auth-toggle">
                <button type="button" className={`toggle-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Đăng nhập</button>
                <button type="button" className={`toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>Đăng ký</button>
            </div>
            
            <div className="form-fields">
                {!isLogin && (
                    <div className="input-group">
                        <label className="input-label" htmlFor="name">Tên người dùng</label>
                        <div className="input-wrapper">
                            <UserIcon className="input-icon" />
                            <input id="name" name="name" type="text" className="form-input" placeholder="Tên người dùng" value={formData.name} onChange={handleInputChange} required />
                        </div>
                    </div>
                )}
                <div className="input-group">
                    <label className="input-label" htmlFor="email">Email</label>
                    <div className="input-wrapper">
                        <MailIcon className="input-icon" />
                        <input id="email" name="email" type="email" className="form-input" placeholder="Email của bạn" value={formData.email} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="input-group">
                    <label className="input-label" htmlFor="password">Mật khẩu</label>
                    <div className="input-wrapper">
                        <LockIcon className="input-icon" />
                        <input id="password" name="password" type={showPassword ? "text" : "password"} className="form-input" placeholder="Mật khẩu" value={formData.password} onChange={handleInputChange} required />
                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>
                {!isLogin && (
                    <div className="input-group">
                        <label className="input-label" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                        <div className="input-wrapper">
                            <LockIcon className="input-icon" />
                            <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="form-input" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleInputChange} required />
                            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Đang xử lý...' : (isLogin ? "Đăng nhập" : "Đăng ký")}
            </button>
            
            <div className="auth-switch">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                <button type="button" className="switch-btn" onClick={toggleAuthMode}>
                    {isLogin ? "Đăng ký" : "Đăng nhập"}
                </button>
            </div>
        </form>
    );
};

// --- Main App Component (không thay đổi) ---
function App() {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <div className="auth-container">
            <div className="background-overlay">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
            </div>
            <div className="floating-icons">
                <SparklesIcon className="floating-icon icon-1" size={30} />
                <ShoppingBagIcon className="floating-icon icon-2" size={24} />
                <SparklesIcon className="floating-icon icon-3" size={20} />
            </div>
            <div className="auth-wrapper">
                <div className="brand-section">
                    <div className="logo-container">
                        <ShoppingBagIcon className="logo-icon" size={32} />
                    </div>
                    <h1 className="brand-title">Nhóm 3</h1>
                    <p className="brand-subtitle">
                        Hệ thống Quản lý bán hàng cho cửa hàng quần áo
                    </p>
                </div>
                <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
        </div>
    );
}

export default App;

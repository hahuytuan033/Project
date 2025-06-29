import React, { useEffect, useState, useCallback } from "react";
import "./style.css"
const API_BASE_URL = 'http://localhost:5000/api';

// Hàm gọi API (không đổi)
const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Lỗi HTTP: ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error(`Lỗi API tại ${method} ${endpoint}:`, error);
        throw error;
    }
};

// --- SVG Icon Components (không đổi) ---
const IconWrapper = ({ children, className, style }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}> {children} </svg> );
const User = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle> </IconWrapper> );
const Mail = ({ className, style }) => ( <IconWrapper className={className} style={style}> <rect width="20" height="16" x="2" y="4" rx="2"></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path> </IconWrapper> );
const Shield = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path> </IconWrapper> );
const Edit = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path> </IconWrapper> );
const Save = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path> <polyline points="17 21 17 13 7 13 7 21"></polyline> <polyline points="7 3 7 8 15 8"></polyline> </IconWrapper> );
const X = ({ className, style }) => ( <IconWrapper className={className} style={style}> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </IconWrapper> );
const UserCheck = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="8.5" cy="7" r="4"></circle> <polyline points="17 11 19 13 23 9"></polyline> </IconWrapper> );
const Crown = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"></path> <path d="M5 20h14"></path> </IconWrapper> );
const Package = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M16.5 9.4a.5.5 0 0 0-.5-.4h-10a.5.5 0 0 0-.5.4L2.7 13.7a.5.5 0 0 0 .5.6h17.1a.5.5 0 0 0 .5-.6l-2.8-4.3z" /> <line x1="2" y1="13.7" x2="2" y2="21" /> <line x1="22" y1="13.7" x2="22" y2="21" /> <path d="M2 13.7h20v7.3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V13.7z" /> <path d="M12 22V9" /> </IconWrapper> );
const ShoppingCart = ({ className, style }) => ( <IconWrapper className={className} style={style}> <circle cx="9" cy="21" r="1"></circle> <circle cx="20" cy="21" r="1"></circle> <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path> </IconWrapper> );
const Users = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> </IconWrapper> );
const Plus = ({ className, style }) => ( <IconWrapper className={className} style={style}> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </IconWrapper> );
const Trash2 = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M3 6h18"></path> <path d="M19 6v14a2 2 0 0 1-2-2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path> <line x1="10" y1="11" x2="10" y2="17"></line> <line x1="14" y1="11" x2="14" y2="17"></line> </IconWrapper> );
const Filter = ({ className, style }) => ( <IconWrapper className={className} style={style}> <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon> </IconWrapper> );
const CheckCircle = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path> <polyline points="22 4 12 14.01 9 11.01"></polyline> </IconWrapper> );
const RefreshCw = ({ className, onClick, disabled, children }) => ( <button onClick={onClick} className={className} disabled={disabled} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}> <IconWrapper> <path d="M3 2v6h6"></path> <path d="M21 12A9 9 0 0 0 6.49 4.36L2 9"></path> <path d="M21 22v-6h-6"></path> <path d="M3 12a9 9 0 0 0 14.51 7.64L22 15"></path> </IconWrapper> {children} </button> );
const LogOut = ({ className, style }) => ( <IconWrapper className={className} style={style}> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line> </IconWrapper> );

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: ""});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchUserDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest('/users/profile');
            setUserInfo(data);
            setEditForm(data);
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });
    const handleStartEdit = () => setIsEditing(true);
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm(userInfo);
    };

    const handleSaveEdit = async () => {
        setIsSaving(true);
        try {
            const updatedUser = await apiRequest('/users/profile', 'PUT', editForm);
            setUserInfo(updatedUser.data);
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            alert(`Lỗi khi lưu: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const getRoleBadgeClass = (isAdmin) => isAdmin ? "account-role-badge-admin" : "account-role-badge-user";
    const getRoleIcon = (isAdmin) => isAdmin ? <Crown className="icon" /> : <UserCheck className="icon" />;
    
    if (isLoading || !userInfo) { 
        return <div className="page-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div className="animate-spin" style={{width: 40, height: 40, border: '4px solid var(--medium-gray)', borderTopColor: 'var(--primary-blue)' }}></div></div>;
    }

    // This CSS is specific to Account component, so it can be defined here.
    const accountStyles = `
        .account-bg { min-height: 100%; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%); padding: 24px; }
        .account-container { max-width: 700px; margin: 0 auto; }
        .account-header { text-align: center; margin-bottom: 32px; }
        .account-title { font-size: 2.5rem; font-weight: bold; background: linear-gradient(to right, var(--primary-blue), #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
        .account-subtitle { color: #64748b; font-size: 1.125rem; }
        .account-success-notification { position: fixed; top: 4.5rem; right: 1.5rem; z-index: 100; background-color: #22c55e; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 0.5rem; animation: bounce 1s; }
        .account-card { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(5px); border-radius: 1.5rem; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); overflow: hidden; position: relative; }
        .account-card-header { background: linear-gradient(to right, var(--primary-blue), #4f46e5); color: #fff; padding: 24px 32px; display: flex; align-items: center; gap: 1.5rem; }
        .account-avatar { width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; border: 4px solid rgba(255, 255, 255, 0.3); flex-shrink: 0; }
        .account-card-header-info h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
        .account-card-header-info p { color: #dbeafe; font-size: 1.125rem; }
        .account-edit-button { position: absolute; top: 1.5rem; right: 1.5rem; padding: 0.5rem; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(4px); border-radius: 0.5rem; transition: all 200ms; border: 1px solid rgba(255, 255, 255, 0.3); cursor: pointer; color: white; }
        .account-edit-button:hover { background-color: rgba(255, 255, 255, 0.3); }
        .account-card-content { padding: 32px; }
        .account-card-content > div > * + * { margin-top: 1.5rem; }
        .account-label { display: block; font-size: 0.9rem; font-weight: 500; color: #334155; margin-bottom: 8px; }
        .account-field-wrapper { position: relative; }
        .account-field-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); width: 1.25rem; height: 1.25rem; color: #9ca3af; }
        .account-input, .account-info { width: 100%; padding-left: 2.75rem; padding-right: 1rem; padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0.75rem; border: 1px solid #d1d5db; background: #fff; font-size: 1rem; }
        .account-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 2px #bfdbfe; outline: none; }
        .account-info { background: #f1f5f9; color: #334155; font-weight: 500; min-height: 46px; display: flex; align-items: center;}
        .account-role-display { width: 100%; padding: 0.5rem 1rem 0.5rem 2.75rem; background-color: var(--light-gray); border-radius: 0.75rem; display: flex; align-items: center; border: 1px solid #d1d5db; }
        .account-role-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 9999px; font-size: 0.9rem; font-weight: 600; }
        .account-role-badge-admin { background: linear-gradient(to right, #fef3c7, #ffedd5); color: #92400e; border: 1px solid #fde68a; }
        .account-role-badge-user { background: linear-gradient(to right, #dbeafe, #e0e7ff); color: #1e40af; border: 1px solid #bfdbfe; }
        .account-role-badge .icon { width: 1.25rem; height: 1.25rem; }
        .account-role-badge-admin .icon { color: #f59e0b; }
        .account-role-badge-user .icon { color: #3b82f6; }
        .account-spinner-small { width: 1.25rem; height: 1.25rem; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
        .account-buttons-container { display: flex; gap: 1rem; padding-top: 1rem; }
        .account-btn { flex-grow: 1; padding: 12px 24px; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; }
        .account-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .account-btn-save { background: linear-gradient(to right, var(--primary-green), #059669); color: #fff; }
        .account-btn-save:hover:not(:disabled) { filter: brightness(1.1); }
        .account-btn-cancel { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
        .account-btn-cancel:hover:not(:disabled) { background: #e2e8f0; }
    `;
    return (
        <>
            <style>{accountStyles}</style>
            <div className="account-bg page-container">
                 <div className="account-container">
                      <div className="account-header">
                          <h1 className="account-title">Thông tin tài khoản</h1>
                          <p className="account-subtitle">Quản lý thông tin cá nhân của bạn</p>
                      </div>

                {showSuccess && (
                    <div className="account-success-notification">
                        <CheckCircle /><span>Thông tin đã được cập nhật thành công!</span>
                    </div>
                )}

                      <div className="account-card">
                          <div className="account-card-header">
                              <div className="account-avatar">{userInfo.name.charAt(0).toUpperCase()}</div>
                              <div className="account-card-header-info">
                                  <h2>{userInfo.name}</h2>
                                  <p>{userInfo.email}</p>
                              </div>
                          </div>
                          
                          {!isEditing && (
                              <button onClick={handleStartEdit} className="account-edit-button" title="Chỉnh sửa thông tin">
                                  <Edit />
                              </button>
                          )}

                          <div className="account-card-content">
                              <div>
                                  <div>
                                      <label className="account-label">Họ và tên</label>
                                      <div className="account-field-wrapper">
                                          <User className="account-field-icon" />
                                         {isEditing ? (
                                              <input name="name" value={editForm.name} onChange={handleEditChange} className="account-input"/>
                                          ) : (
                                              <div className="account-info">{userInfo.name}</div>
                                          )}
                                      </div>
                                  </div>
                                  <div>
                                      <label className="account-label">Địa chỉ email</label>
                                      <div className="account-field-wrapper">
                                          <Mail className="account-field-icon" />
                                          {isEditing ? (
                                              <input name="email" type="email" value={editForm.email} onChange={handleEditChange} className="account-input"/>
                                          ) : (
                                              <div className="account-info">{userInfo.email}</div>
                                          )}
                                      </div>
                                  </div>
                                   <div>
                                      <label className="account-label">Vai trò</label>
                                      <div className="account-field-wrapper">
                                          <Shield className="account-field-icon" />
                                          <div className="account-role-display">
                                              <span className={`account-role-badge ${getRoleBadgeClass(userInfo.isAdmin)}`}>
                                                  {getRoleIcon(userInfo.isAdmin)}
                                                  {userInfo.isAdmin ? "Quản trị viên" : "Người dùng"}
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                 {isEditing && (
                                      <div className="account-buttons-container">
                                          <button onClick={handleSaveEdit} disabled={isSaving} className="account-btn account-btn-save">
                                              {isSaving ? (<><div className="account-spinner-small"></div><span>Đang lưu...</span></>) 
                                                      : (<><Save style={{width: 20, height: 20}}/><span>Lưu thay đổi</span></>)}
                                          </button>
                                          <button onClick={handleCancelEdit} disabled={isSaving} className="account-btn account-btn-cancel">
                                              <X style={{width: 20, height: 20}}/><span>Hủy</span>
                                          </button>
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                 </div>
            </div>
        </>
    );
};

// --- Order Component ---
const Order = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({
        customerName: "", phoneNumber: "", address: "", 
        product: "", quantity: 1, shippingFee: 0, notes: "",
    });
    const [editingOrder, setEditingOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const shippingOptions = [
        { name: "Viettel Post", fee: 30000 }, { name: "GHTK", fee: 25000 }, { name: "Grab", fee: 45000 },
    ];
    const orderStatuses = ["Đang chờ xử lý", "Đã xác nhận", "Đang xử lý", "Đã gửi hàng", "Đã nhận hàng", "Đã hủy"];

    const fetchInitialData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [ordersData, productsData] = await Promise.all([
                apiRequest('/orders'),
                apiRequest('/products')
            ]);
            setOrders(ordersData);
            setProducts(productsData);
        } catch (error) {
            alert(`Lỗi tải dữ liệu: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchInitialData();
        setIsRefreshing(false);
    }

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const calculateTotal = useCallback(() => {
        const selectedProduct = products.find(p => p._id === currentOrder.product);
        if (!selectedProduct) return currentOrder.shippingFee;
        const productTotal = selectedProduct.price * currentOrder.quantity;
        return productTotal + Number(currentOrder.shippingFee);
    }, [currentOrder.product, currentOrder.quantity, currentOrder.shippingFee, products]);

    const handleCreateOrder = async () => {
        const selectedProduct = products.find(p => p._id === currentOrder.product);
        if (!currentOrder.customerName || !currentOrder.phoneNumber || !currentOrder.address || !selectedProduct) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        const orderData = {
            ...currentOrder,
            items: [{
                name: selectedProduct.name,
                quantity: currentOrder.quantity,
                price: selectedProduct.price,
                product: selectedProduct._id,
            }],
            totalPrice: calculateTotal(),
        };

        try {
            await apiRequest('/orders', 'POST', orderData);
            alert('Tạo đơn hàng thành công!');
            fetchInitialData(); // Tải lại
            setCurrentOrder({ customerName: "", phoneNumber: "", address: "", product: "", quantity: 1, shippingFee: 0, notes: "" });
        } catch(error) {
            alert(`Lỗi tạo đơn hàng: ${error.message}`);
        }
    };

    const handleUpdateOrder = async () => {
        if (!editingOrder) return;
        try {
            await apiRequest(`/orders/${editingOrder._id}`, 'PUT', { status: editingOrder.status, notes: editingOrder.notes });
            alert('Cập nhật đơn hàng thành công!');
            setEditingOrder(null);
            fetchInitialData(); // Tải lại
        } catch (error) {
            alert(`Lỗi cập nhật: ${error.message}`);
        }
    };

    const orderStyles = `
        .order-management-container { min-height: 100%; background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); padding: 1.5rem; }
        .order-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
        .order-total-display { background-color: #eff6ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; border: 1px solid #bfdbfe;}
        .order-total-display .total-label { font-size: 0.9rem; font-weight: 500; color: #1e3a8a; }
        .order-total-display .total-value { font-size: 1.25rem; font-weight: 700; color: #1d4ed8; }
        .orders-table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .refresh-button { background-color: #e0f2fe; color: #0369a1; padding: 0.5rem 0.75rem; border: 1px solid #bae6fd; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; cursor: pointer; }
        .refresh-button:hover:not(:disabled) { background-color: #bae6fd; }
        .refresh-button:disabled { opacity: 0.5; cursor: wait; }
        .order-actions { display: flex; gap: 0.25rem; }
        .order-action-btn { color: white; padding: 0.35rem; border-radius: 0.25rem; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .order-action-btn.edit { background-color: var(--primary-blue); }
        .order-action-btn.edit:hover { background-color: var(--primary-blue-dark); }
        .status-badge { display: inline-block; padding: 0.25em 0.8em; border-radius: 999px; font-size: 0.85em; font-weight: 500; white-space: nowrap; }
        .status-pending, .status-đangchờxửlý { background: #f3f4f6; color: #64748b; }
        .status-confirmed, .status-đãxácnhận { background: #dbeafe; color: #1e40af; }
        .status-processing, .status-đangxửlý { background: #fef9c3; color: #854d0e; }
        .status-shipped, .status-đãgửihàng { background: #dbeafe; color: #1e40af; }
        .status-delivered, .status-đãnhậnhàng { background: #dcfce7; color: #166534; }
        .status-cancelled, .status-đãhủy { background: #fee2e2; color: #991b1b; }
    `;

    return (
        <>
        <style>{orderStyles}</style>
        <div className="order-management-container page-container">
            <div className="app-card">
                <h2 className="app-card-title"><ShoppingCart /> Tạo đơn hàng mới</h2>
                <div className="order-form-grid">
                    <div className="app-form-group"><label>Tên khách hàng *</label><input type="text" value={currentOrder.customerName} onChange={(e) => setCurrentOrder(p => ({ ...p, customerName: e.target.value }))} /></div>
                    <div className="app-form-group"><label>Số điện thoại *</label><input type="tel" value={currentOrder.phoneNumber} onChange={(e) => setCurrentOrder(p => ({ ...p, phoneNumber: e.target.value }))}/></div>
                    <div className="app-form-group" style={{gridColumn: '1 / -1'}}><label>Địa chỉ *</label><input type="text" value={currentOrder.address} onChange={(e) => setCurrentOrder(p => ({ ...p, address: e.target.value }))} required/></div>
                    
                    <div className="app-form-group" style={{gridColumn: 'span 2'}}><label>Sản phẩm *</label>
                        <select value={currentOrder.product} onChange={(e) => setCurrentOrder(p => ({ ...p, product: e.target.value }))}>
                            <option value="">Chọn sản phẩm</option>
                            {products.map(p => <option key={p._id} value={p._id}>{p.name} - {p.price.toLocaleString('vi-VN')}đ</option>)}
                        </select>
                    </div>
                    <div className="app-form-group"><label>Số lượng</label><input type="number" min="1" value={currentOrder.quantity} onChange={(e) => setCurrentOrder(p => ({ ...p, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}/></div>
                    
                    <div className="app-form-group"><label>Vận chuyển</label>
                        <select value={currentOrder.shippingFee} onChange={(e) => setCurrentOrder(p => ({ ...p, shippingFee: Number(e.target.value) }))}>
                            <option value={0}>Chọn đơn vị</option>
                            {shippingOptions.map(s => <option key={s.name} value={s.fee}>{s.name} (+{s.fee.toLocaleString('vi-VN')}đ)</option>)}
                        </select>
                    </div>
                    <div className="app-form-group" style={{gridColumn: '1 / -1'}}><label>Ghi chú</label><input type="text" value={currentOrder.notes} onChange={(e) => setCurrentOrder(p => ({ ...p, notes: e.target.value }))} /></div>
                </div>
                <div className="order-total-display"><span className="total-label">Tổng tiền:</span><span className="total-value">{calculateTotal().toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span></div>
                <div style={{display: 'flex', justifyContent:'flex-end', marginTop: '1.5rem'}}><button className="app-button" onClick={handleCreateOrder}>Tạo đơn hàng</button></div>
            </div>

            <div className="app-card">
                <div className="orders-table-header">
                    <h2 className="app-card-title">Danh sách đơn hàng ({orders.length})</h2>
                    <RefreshCw className="refresh-button" onClick={handleRefresh} disabled={isRefreshing}>
                        {isRefreshing ? "Đang tải..." : "Làm mới"}
                    </RefreshCw>
                </div>
                <div className="app-table-wrapper">
                    <table className="app-table">
                        <thead><tr><th>Mã ĐH</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {isLoading ? (<tr><td colSpan="6" style={{textAlign: 'center'}}>Đang tải...</td></tr>) :
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>#{order._id.slice(-6)}</td>
                                        <td>{order.customerName}<br/><span style={{color: '#64748b', fontSize: '0.8rem'}}>{order.phoneNumber}</span></td>
                                        <td>{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</td>
                                        <td>{order.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                                        <td><span className={`status-badge status-${(order.status || "pending").toLowerCase().replace(/\s/g, '')}`}>{order.status}</span></td>
                                        <td><div className="order-actions">
                                            <button onClick={() => setEditingOrder({...order})} className="order-action-btn edit" title="Chỉnh sửa"><Edit style={{width: 16, height: 16}}/></button>
                                        </div></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {editingOrder && (
                 <div className="modal-overlay">
                      <div className="modal-content">
                          <div className="modal-header"><h3>Cập nhật ĐH #{editingOrder._id.slice(-6)}</h3><button onClick={() => setEditingOrder(null)} className="modal-close-btn"><X /></button></div>
                          <div className="modal-body">
                              <div className="app-form-group"><label>Trạng thái</label><select value={editingOrder.status} onChange={(e) => setEditingOrder(p => ({ ...p, status: e.target.value }))}>{orderStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                              <div className="app-form-group"><label>Ghi chú</label><textarea value={editingOrder.notes || ""} onChange={(e) => setEditingOrder(p => ({ ...p, notes: e.target.value }))} rows={3}/></div>
                          </div>
                          <div className="modal-footer"><button onClick={() => setEditingOrder(null)} className="app-button btn-secondary">Hủy</button><button onClick={handleUpdateOrder} className="app-button">Cập nhật</button></div>
                      </div>
                 </div>
             )}
        </div>
        </>
    );
};


// --- Product Component ---
const Product = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [filters, setFilters] = useState({ size: "", color: "", priceMin: "", priceMax: "", category: "" });
    const initialFormState = { code: "", name: "", size: "", color: "", price: "", quantity: "", category: "", imageUrl: "" };
    const [productForm, setProductForm] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ["Áo thun", "Áo sơ mi", "Quần Jeans", "Quần Tây", "Váy", "Áo khoác"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Đỏ", "Xanh dương", "Xanh lá", "Đen", "Trắng", "Vàng", "Tím"];
    const colorMap = { "Đỏ": "red", "Xanh dương": "blue", "Xanh lá": "green", "Đen": "black", "Trắng": "#DDD", "Vàng": "yellow", "Tím": "purple" };

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(filters);
            Object.keys(filters).forEach(key => {
                if (!filters[key]) {
                    params.delete(key);
                }
            });
            const data = await apiRequest(`/products?${params.toString()}`);
            setProducts(data);
        } catch (error) {
            alert(`Lỗi tải sản phẩm: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const resetAndCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setProductForm(initialFormState);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setProductForm({ ...product, price: String(product.price), quantity: String(product.quantity) });
        setShowModal(true);
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa "${product.name}" không?`)) {
            try {
                await apiRequest(`/products/${product._id}`, 'DELETE');
                alert('Xóa sản phẩm thành công!');
                fetchProducts();
            } catch (error) {
                alert(`Lỗi xóa sản phẩm: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...productForm, price: Number(productForm.price), quantity: Number(productForm.quantity) };
        try {
            if (editingProduct) {
                await apiRequest(`/products/${editingProduct._id}`, 'PUT', payload);
                alert('Cập nhật sản phẩm thành công!');
            } else {
                await apiRequest('/products', 'POST', payload);
                alert('Thêm sản phẩm thành công!');
            }
            resetAndCloseModal();
            fetchProducts();
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        }
    };

    return (
        <div className="page-container">
            <div className="app-card">
                <div className="app-card-header">
                     <h1 className="app-card-title"><Package />Quản lý Sản phẩm</h1>
                    <button onClick={() => setShowModal(true)} className="app-button"><Plus />Thêm</button>
                </div>
            </div>

            <div className="app-card">
                 <div className="product-filters-header"><Filter /><h2 className="app-card-title" style={{marginBottom: 0, fontSize: '1.25rem'}}>Bộ lọc</h2></div>
                 <div className="product-filters-grid">
                      <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}><option value="">Loại hàng</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
                      <select value={filters.size} onChange={e => setFilters(f => ({ ...f, size: e.target.value }))}><option value="">Size</option>{sizes.map(s => <option key={s} value={s}>{s}</option>)}</select>
                      <select value={filters.color} onChange={e => setFilters(f => ({ ...f, color: e.target.value }))}><option value="">Màu sắc</option>{colors.map(c => <option key={c} value={c}>{c}</option>)}</select>
                      <input type="number" placeholder="Giá thấp nhất" value={filters.priceMin} onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))}/>
                      <input type="number" placeholder="Giá cao nhất" value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}/>
                      <button onClick={() => setFilters({ size: "", color: "", priceMin: "", priceMax: "", category: "" })} className="app-button" style={{backgroundColor: '#6b7280'}}>Xóa bộ lọc</button>
                 </div>
            </div>

            <div className="app-card">
              <h2 className="app-card-title" style={{marginBottom: '1rem'}}>Sản phẩm ({products.length})</h2>
              <div className="app-table-wrapper">
                   <table className="app-table">
                       <thead><tr><th>Ảnh</th><th>Mã SP</th><th>Tên</th><th>Size</th><th>Màu</th><th>Giá</th><th>SL</th><th>Loại</th><th>Thao tác</th></tr></thead>
                       <tbody>
                        {isLoading ? (<tr><td colSpan="9" style={{textAlign: 'center'}}>Đang tải...</td></tr>) :
                            products.map(p => (
                                <tr key={p._id}>
                                    <td><div className="product-image-cell"><img src={p.imageUrl || 'https://placehold.co/100x100/e2e8f0/e2e8f0?text=...'} alt={p.name} className="product-image"/></div></td>
                                    <td>{p.code}</td><td>{p.name}</td><td>{p.size}</td>
                                    <td><span className="product-color-indicator"><div className="product-color-dot" style={{backgroundColor: colorMap[p.color] || '#ccc'}}></div>{p.color}</span></td>
                                    <td>{p.price.toLocaleString('vi-VN')}đ</td><td>{p.quantity}</td><td>{p.category}</td>
                                    <td><div className="table-actions"><button onClick={() => handleEdit(p)} className="edit-btn" title="Chỉnh sửa"><Edit/></button><button onClick={() => handleDelete(p)} className="delete-btn" title="Xóa"><Trash2/></button></div></td>
                                </tr>
                            ))
                        }
                       </tbody>
                   </table>
              </div>
            </div>

            {showModal && (
                 <div className="modal-overlay">
                      <div className="modal-content" style={{maxWidth: '700px'}}>
                         <form onSubmit={handleSubmit}>
                          <div className="modal-header"><h3>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3><button type="button" onClick={resetAndCloseModal} className="modal-close-btn"><X/></button></div>
                          <div className="modal-body product-modal-form-grid">
                              <div className="product-form-full app-form-group"><label className="product-form-label">Ảnh sản phẩm</label><input type="text" placeholder="URL hình ảnh" value={productForm.imageUrl} onChange={e => setProductForm(f => ({ ...f, imageUrl: e.target.value }))} /></div>
                              <div className="app-form-group"><label className="product-form-label">Mã SP*</label><input type="text" value={productForm.code} onChange={e => setProductForm(f => ({ ...f, code: e.target.value }))} required/></div>
                              <div className="app-form-group"><label className="product-form-label">Tên SP*</label><input type="text" value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} required/></div>
                              <div className="app-form-group"><label className="product-form-label">Giá*</label><input type="number" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} required/></div>
                              <div className="app-form-group"><label className="product-form-label">Số lượng*</label><input type="number" value={productForm.quantity} onChange={e => setProductForm(f => ({ ...f, quantity: e.target.value }))} required/></div>
                              <div className="app-form-group"><label className="product-form-label">Size</label><select value={productForm.size} onChange={e => setProductForm(f => ({ ...f, size: e.target.value }))}><option value="">Chọn Size</option>{sizes.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                              <div className="app-form-group"><label className="product-form-label">Màu</label><select value={productForm.color} onChange={e => setProductForm(f => ({ ...f, color: e.target.value }))}><option value="">Chọn Màu</option>{colors.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                              <div className="product-form-full app-form-group"><label className="product-form-label">Loại hàng*</label><select value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} required><option value="">Chọn loại</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" onClick={resetAndCloseModal} className="app-button btn-secondary">Hủy</button>
                              <button type="submit" className="app-button">{editingProduct ? "Cập nhật" : "Thêm"}</button>
                          </div>
                         </form>
                      </div>
                 </div>
             )}
        </div>
    );
};


// --- Customer Component (NÂNG CẤP) ---
const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const initialFormState = { name: "", email: "", phone: "", points: 0 };
    const [customerForm, setCustomerForm] = useState(initialFormState);

    const fetchCustomers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest('/customers');
            setCustomers(data);
        } catch (error) {
            alert(`Lỗi tải danh sách khách hàng: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleAddNew = () => {
        setEditingCustomer(null);
        setCustomerForm(initialFormState);
        setShowModal(true);
    };
    
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setCustomerForm({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            points: customer.points
        });
        setShowModal(true);
    };

    const handleDelete = async (customer) => {
        if (window.confirm(`Bạn có chắc muốn xóa khách hàng "${customer.name}"?`)) {
            try {
                await apiRequest(`/customers/${customer._id}`, 'DELETE');
                alert('Xóa khách hàng thành công!');
                fetchCustomers();
            } catch (error) {
                alert(`Lỗi khi xóa: ${error.message}`);
            }
        }
    };
    
    const closeModal = () => {
        setShowModal(false);
        setEditingCustomer(null);
        setCustomerForm(initialFormState);
    };
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCustomerForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = { ...customerForm, points: Number(customerForm.points) || 0 };
        
        try {
            if (editingCustomer) {
                await apiRequest(`/customers/${editingCustomer._id}`, 'PUT', payload);
                alert('Cập nhật khách hàng thành công!');
            } else {
                await apiRequest('/customers', 'POST', payload);
                alert('Thêm khách hàng thành công!');
            }
            closeModal();
            fetchCustomers();
        } catch (error) {
            alert(`Lỗi: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <div className="app-card">
                 <div className="app-card-header">
                    <h2 className="app-card-title"><Users />Quản lý Khách hàng</h2>
                    <button onClick={handleAddNew} className="app-button"><Plus />Thêm mới</button>
                </div>

                <div className="app-table-wrapper">
                    <table className="app-table">
                        <thead>
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Điểm tích lũy</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Đang tải...</td></tr>
                            ) : customers.length > 0 ? (
                                customers.map((cus) => (
                                    <tr key={cus._id}>
                                        <td>{cus.name}</td>
                                        <td>{cus.email}</td>
                                        <td>{cus.phone}</td>
                                        <td>{cus.points}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button onClick={() => handleEdit(cus)} className="edit-btn" title="Chỉnh sửa">
                                                    <Edit style={{ width: 20, height: 20 }} />
                                                </button>
                                                <button onClick={() => handleDelete(cus)} className="delete-btn" title="Xóa">
                                                    <Trash2 style={{ width: 20, height: 20 }}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có khách hàng nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h3>{editingCustomer ? 'Chỉnh sửa Khách hàng' : 'Thêm Khách hàng mới'}</h3>
                                <button type="button" onClick={closeModal} className="modal-close-btn"><X /></button>
                            </div>
                            <div className="modal-body">
                                <div className="app-form-group">
                                    <label htmlFor="name">Tên khách hàng *</label>
                                    <input id="name" name="name" value={customerForm.name} onChange={handleFormChange} required />
                                </div>
                                <div className="app-form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input id="email" name="email" type="email" value={customerForm.email} onChange={handleFormChange} required />
                                </div>
                                <div className="app-form-group">
                                    <label htmlFor="phone">Số điện thoại *</label>
                                    <input id="phone" name="phone" value={customerForm.phone} onChange={handleFormChange} required />
                                </div>
                                <div className="app-form-group">
                                    <label htmlFor="points">Điểm tích lũy</label>
                                    <input id="points" name="points" type="number" min="0" value={customerForm.points} onChange={handleFormChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={closeModal} className="app-button btn-secondary" disabled={isSubmitting}>Hủy</button>
                                <button type="submit" className="app-button" disabled={isSubmitting}>
                                    {isSubmitting ? 'Đang lưu...' : (editingCustomer ? 'Lưu thay đổi' : 'Thêm khách hàng')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Home Component (Không đổi) ---
const Home = () => {

    const [activePage, setActivePage] = useState("Tài khoản");
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsCheckingAuth(false); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
        window.location.href = '/'; 
    };

    const menuItems = [
        { name: "Tài khoản", icon: User },
        { name: "Sản phẩm", icon: Package },
        { name: "Đặt hàng", icon: ShoppingCart },
        { name: "Customer", icon: Users },
    ];

    const renderContent = () => {
        switch (activePage) {
            case "Tài khoản": return <Account />;
            case "Sản phẩm": return <Product />;
            case "Đặt hàng": return <Order />;
            case "Customer": return <Customer />;
            default: return <div>Chọn một mục để quản lý</div>;
        }
    };
    
    if (isCheckingAuth) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
                <div className="animate-spin" style={{ width: 40, height: 40, border: '4px solid var(--medium-gray)', borderTopColor: 'var(--primary-blue)' }}></div>
            </div>
        );
    }
    
    if (!isAuthenticated) {
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
        return <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Bạn chưa đăng nhập. Đang chuyển hướng...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-sidebar">
                <div className="home-sidebar-header">
                    <h2 className="home-sidebar-title">Quản lý Cửa Hàng</h2>
                </div>
                <nav className="home-nav">
                    <ul>
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activePage === item.name;
                            return (
                                <li key={item.name}>
                                    <button onClick={() => setActivePage(item.name)} className={`home-nav-button ${isActive ? "active" : ""}`}>
                                        <IconComponent className="icon" />
                                        <span className="text">{item.name}</span>
                                        {isActive && <div className="pulse-dot"></div>}
                                    </button>
                                </li>
                            );
                        })}
                        <li>
                            <button onClick={handleLogout} className="home-nav-button logout-btn">
                                <LogOut className="icon" />
                                <span className="text">Đăng xuất</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="home-sidebar-footer">Make by Nhom3</div>
            </div>
            <main className="home-main-content">
                <div className="home-top-bar">
                    <div className="home-online-status">
                        <div className="home-online-dot"></div>
                        <span className="home-online-text">Online</span>
                    </div>
                </div>
                {renderContent()}
            </main>
        </div>
    );
};

export default Home;

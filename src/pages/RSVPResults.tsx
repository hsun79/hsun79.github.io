import { useState, useEffect, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { db } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";

interface RSVPData {
  id: string;
  name: string;
  phone: string;
  email: string;
  attending: string;
  meal: string;
  allergies: string;
  accommodation: string;
  song: string;
  createdAt: any;
}

const RSVPResults = () => {
  const [rsvpData, setRsvpData] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  
  // Add state for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rsvpToDelete, setRsvpToDelete] = useState<RSVPData | null>(null);
  
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchRSVPs();
      } else {
        setRsvpData([]);
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [auth]);

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      // Create query with ordering by createdAt timestamp
      const rsvpQuery = query(
        collection(db, "rsvps"),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(rsvpQuery);
      const rsvps: RSVPData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        rsvps.push({
          id: doc.id,
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          attending: data.attending || "",
          meal: data.meal || "",
          allergies: data.allergies || "",
          accommodation: data.accommodation || "",
          song: data.song || "",
          createdAt: data.createdAt ? new Date(data.createdAt.toDate()) : null
        });
      });
      
      setRsvpData(rsvps);
    } catch (err) {
      console.error("Error fetching RSVPs:", err);
      setError("获取RSVP数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After successful login, fetchRSVPs will be called by the onAuthStateChanged listener
    } catch (err: any) {
      console.error("Login error:", err);
      setAuthError(err.message || "登录失败");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Summary counts
  const attendingCount = rsvpData.filter(rsvp => rsvp.attending === "yes").length;
  const notAttendingCount = rsvpData.filter(rsvp => rsvp.attending === "no").length;
  
  const mealCounts = {
    beef: rsvpData.filter(rsvp => rsvp.meal === "beef").length,
    fish: rsvpData.filter(rsvp => rsvp.meal === "fish").length,
    vegetarian: rsvpData.filter(rsvp => rsvp.meal === "vegetarian").length,
  };

  const accommodationCounts = {
    yes: rsvpData.filter(rsvp => rsvp.accommodation === "yes").length,
    no: rsvpData.filter(rsvp => rsvp.accommodation === "no").length,
  };

  // Column definitions
  const columnHelper = createColumnHelper<RSVPData>();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "姓名",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("phone", {
        header: "电话",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "邮箱",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("attending", {
        header: "出席",
        cell: info => info.getValue() === "yes" ? "✅ 出席" : "❌ 不出席",
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("meal", {
        header: "菜单",
        cell: info => {
          const meal = info.getValue();
          if (meal === "beef") return "🥩 牛肉";
          if (meal === "fish") return "🐟 鱼肉";
          if (meal === "vegetarian") return "🥗 素食";
          return "";
        },
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("allergies", {
        header: "过敏/禁忌",
        cell: info => info.getValue() || "无",
      }),
      columnHelper.accessor("accommodation", {
        header: "住宿",
        cell: info => info.getValue() === "yes" ? "✅ 需要" : "❌ 不需要",
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("song", {
        header: "歌曲",
        cell: info => info.getValue() || "无",
      }),
      columnHelper.accessor("createdAt", {
        header: "提交时间",
        cell: info => info.getValue() ? info.getValue().toLocaleString() : "未知",
        sortingFn: "datetime",
      }),
      columnHelper.display({
        id: "actions",
        header: "操作",
        cell: (info) => (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => openDeleteModal(info.row.original)}
            className="print:hidden"
          >
            删除
          </Button>
        ),
      }),
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data: rsvpData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Add delete function
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      setRsvpData(prevData => prevData.filter(rsvp => rsvp.id !== id));
    } catch (err) {
      console.error("Error deleting RSVP:", err);
      alert("删除RSVP失败");
    }
  };

  // Function to open delete modal
  const openDeleteModal = (rsvp: RSVPData) => {
    setRsvpToDelete(rsvp);
    setDeleteModalOpen(true);
  };

  // Function to handle confirm delete
  const confirmDelete = () => {
    if (rsvpToDelete) {
      handleDelete(rsvpToDelete.id);
      setDeleteModalOpen(false);
      setRsvpToDelete(null);
    }
  };

  // Function to cancel delete
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setRsvpToDelete(null);
  };

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="py-8 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">管理员登录</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              密码
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={authLoading}
          >
            {authLoading ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="print:hidden flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">RSVP 结果</h1>
        <div className="flex gap-2">
          <Button onClick={handlePrint}>打印</Button>
          <Button variant="outline" onClick={handleLogout}>退出登录</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">加载中...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-2">出席统计</h2>
              <p>确认出席: {attendingCount} 人</p>
              <p>无法出席: {notAttendingCount} 人</p>
              <p>总计: {rsvpData.length} 人</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-2">菜单选择</h2>
              <p>牛肉: {mealCounts.beef} 人</p>
              <p>鱼肉: {mealCounts.fish} 人</p>
              <p>素食: {mealCounts.vegetarian} 人</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-2">住宿需求</h2>
              <p>需要住宿: {accommodationCounts.yes} 人</p>
              <p>不需要住宿: {accommodationCounts.no} 人</p>
            </div>
          </div>

          {/* Search input */}
          <div className="mb-4 print:hidden">
            <Input
              placeholder="搜索任意内容..."
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="py-2 px-4 border text-left"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="flex items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className="ml-1">
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? ''}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-2 px-4 border">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-4 text-gray-500">没有找到匹配的记录</div>
          )}
          
          <div className="mt-4 text-sm text-gray-500 print:hidden">
            显示 {table.getRowModel().rows.length} 条记录，共 {rsvpData.length} 条
          </div>
        </>
      )}

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="确认删除"
        message={`确定要删除 ${rsvpToDelete?.name || ""} 的RSVP信息吗？此操作不可撤销。`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default RSVPResults; 
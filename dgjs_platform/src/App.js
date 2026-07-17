import { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Server } from 'lucide-react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 백엔드 API 호출 (package.json의 proxy 설정으로 인해 localhost:8080으로 자동 포워딩됨)
    fetch('/api/test')
      .then((res) => {
        if (!res.ok) {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8 max-w-md w-full transition-all duration-500 hover:shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Server className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          API 연동 테스트
        </h1>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Activity className="w-8 h-8 text-indigo-500 animate-spin" />
              <p className="text-gray-500 font-medium">서버와 연결 중입니다...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">연결 실패</h3>
                <p className="text-sm text-red-600 mt-1">{error}</p>
                <p className="text-xs text-red-500 mt-2">백엔드 서버(Spring Boot)가 실행 중인지 확인해주세요.</p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">연결 성공!</h3>
                <p className="text-sm text-green-600 mt-1">{data.message}</p>
                <div className="mt-3 text-xs text-green-700 bg-green-100/50 rounded-lg p-2 font-mono">
                  서버 시간: {data.timestamp}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

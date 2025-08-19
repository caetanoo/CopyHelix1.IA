import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistMetrics from "@/components/WaitlistMetrics";
import { BarChart3, Lock } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WaitlistDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useSEO({
    title: "Dashboard Waitlist - CopyHelix.ai | Métricas Internas",
    description: "Dashboard interno para acompanhamento das métricas da lista de espera beta",
    keywords: "dashboard, metrics, waitlist, analytics",
    robots: "noindex, nofollow" // Prevent indexing of internal dashboard
  });

  const handleAuth = () => {
    // Simple password protection (in production, use proper authentication)
    if (password === "copyhelix2025") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <Card className="glass-card border-primary/30 w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dashboard Interno
            </h1>
            <p className="text-muted-foreground mb-6">
              Acesso restrito - Digite a senha para continuar
            </p>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                className="text-center"
              />
              
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              
              <Button 
                onClick={handleAuth}
                className="btn-primary w-full"
                disabled={!password}
              >
                Acessar Dashboard
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6">
              Apenas para equipe CopyHelix.ai
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/30">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Waitlist Analytics
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dashboard completo de métricas da lista de espera beta
              </p>
            </motion.div>
          </div>

          {/* Metrics Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WaitlistMetrics />
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default WaitlistDashboard;
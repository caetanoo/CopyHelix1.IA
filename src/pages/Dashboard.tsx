import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  User, 
  Building, 
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Meeting {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: string;
  source: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalMeetings: number;
  pendingMeetings: number;
  totalContacts: number;
  newContacts: number;
}

const Dashboard = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMeetings: 0,
    pendingMeetings: 0,
    totalContacts: 0,
    newContacts: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats, meetings, and contacts in parallel
      const [statsRes, meetingsRes, contactsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/meetings'),
        fetch('/api/contacts')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (meetingsRes.ok) {
        const meetingsData = await meetingsRes.json();
        setMeetings(meetingsData.meetings || []);
      }

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.contacts || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMeetingStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh data
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'new': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold">Dashboard - CopyHelix.ai</h1>
            <p className="text-muted-foreground">
              Gerencie seus leads e agendamentos
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Reuniões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{stats.totalMeetings}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reuniões Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold">{stats.pendingMeetings}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Contatos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-2xl font-bold">{stats.totalContacts}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Novos Contatos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-2xl font-bold">{stats.newContacts}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="meetings">Reuniões ({meetings.length})</TabsTrigger>
              <TabsTrigger value="contacts">Contatos ({contacts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Meetings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Reuniões Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meetings.slice(0, 5).map((meeting) => (
                        <div key={meeting.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{meeting.name}</p>
                            <p className="text-sm text-muted-foreground">{meeting.company}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(meeting.status)}>
                              {meeting.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(meeting.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Contatos Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.subject}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getPriorityColor(contact.priority)}>
                              {contact.priority}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(contact.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="font-semibold">{meeting.name}</span>
                          <Badge className={`ml-2 ${getStatusColor(meeting.status)}`}>
                            {meeting.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {meeting.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {meeting.phone || 'Não informado'}
                          </div>
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2" />
                            {meeting.company || 'Não informado'}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {meeting.preferred_date} às {meeting.preferred_time}
                          </div>
                        </div>

                        {meeting.message && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm">{meeting.message}</p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-3">
                          Agendado em: {formatDate(meeting.created_at)}
                        </p>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        {meeting.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => updateMeetingStatus(meeting.id, 'confirmed')}
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmar
                            </Button>
                            <Button
                              onClick={() => updateMeetingStatus(meeting.id, 'cancelled')}
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                        {meeting.status === 'confirmed' && (
                          <Button
                            onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Marcar como Concluída
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="font-semibold">{contact.name}</span>
                          <Badge className={`ml-2 ${getPriorityColor(contact.priority)}`}>
                            {contact.priority}
                          </Badge>
                          <Badge variant="outline" className="ml-2">
                            {contact.source}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            {contact.email}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{contact.subject}</span>
                          </div>
                        </div>

                        {contact.message && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm">{contact.message}</p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-3">
                          Recebido em: {formatDate(contact.created_at)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
import { 
  DrawerSceneWrapper, 
  Container,
  CustomButton,
  Header
} from '@/components';
import { colors } from '@/constants';
import { useAuth } from '@/context/AuthProvider';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  const { user } = useAuth();

  return (
    <DrawerSceneWrapper>
      <Container>
        <Header page='Home' />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                  style={styles.avatar}
                />
                <View style={styles.userTextContainer}>
                  <Text style={styles.greeting}>Olá,</Text>
                  <Text style={styles.userName}>{user?.fullName || 'Cristiano Belfort'}</Text>
                  <Text style={styles.userSubtext}>Bem vindo</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Feather name="bell" size={24} color={colors.white} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>

            {/* Balance Section */}
            <View style={styles.balanceSection}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Ganhos</Text>
                <Text style={styles.balanceAmount}>R$7.789,00</Text>
              </View>
              <View style={styles.balanceDivider} />
              <View style={styles.balanceItem}>
                <View style={styles.expenseHeader}>
                  <Feather name="trending-up" size={16} color="#FF6B6B" />
                  <Text style={[styles.balanceLabel, styles.expenseLabel]}>Gastos Mensais</Text>
                </View>
                <Text style={[styles.balanceAmount, styles.expenseAmount]}>R$1.187,40</Text>
                <Text style={styles.percentageText}>+8,15% do que o mês passado</Text>
              </View>
            </View>

            {/* Goal Progress */}
            <View style={styles.goalSection}>
              <Feather name="target" size={16} color={colors.white} />
              <Text style={styles.goalText}>205 Em despesas, Oiiiiixi</Text>
            </View>
          </View>

          {/* Account Balance Card */}
          <View style={styles.accountCard}>
            <View style={styles.accountHeader}>
              <View style={styles.accountIconContainer}>
                <Feather name="credit-card" size={24} color={colors.primary} />
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.accountLabel}>Saldo da Conta</Text>
                <Text style={styles.accountAmount}>R$4.000,00</Text>
              </View>
            </View>

            <View style={styles.accountDetails}>
              <View style={styles.accountDetailRow}>
                <Feather name="calendar" size={14} color="#666" />
                <Text style={styles.accountDetailText}>Proventos</Text>
                <Text style={styles.accountDetailValue}>R$0,00</Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Feather name="arrow-down-circle" size={14} color="#666" />
                <Text style={styles.accountDetailText}>Gastos</Text>
                <Text style={styles.accountDetailValue}>-R$5.000,00</Text>
              </View>
            </View>
          </View>

          {/* Transactions List */}
          <View style={styles.transactionsSection}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            
            {/* Transaction Items */}
            <TransactionItem
              icon="trending-up"
              iconBg="#E3F2FD"
              iconColor="#2196F3"
              title="Entrada"
              subtitle="Rendim... • Mensal"
              amount="R$2.000,00"
              positive
            />
            
            <TransactionItem
              icon="shopping-bag"
              iconBg="#FFF3E0"
              iconColor="#FF9800"
              title="Supermercado"
              subtitle="Extra - Abril 18"
              amount="-R$500,00"
            />
            
            <TransactionItem
              icon="zap"
              iconBg="#E8F5E9"
              iconColor="#4CAF50"
              title="Aluguel"
              subtitle="Abril - Mensal"
              amount="-R$875,00"
            />
          </View>
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <Feather name="plus" size={28} color={colors.white} />
        </TouchableOpacity>
      </Container>
    </DrawerSceneWrapper>
  );
}

// Transaction Item Component
function TransactionItem({ 
  icon, 
  iconBg, 
  iconColor, 
  title, 
  subtitle, 
  amount, 
  positive = false 
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={[styles.transactionIcon, { backgroundColor: iconBg }]}>
        <Feather name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionSubtitle}>{subtitle}</Text>
      </View>
      <Text style={[
        styles.transactionAmount, 
        positive && styles.transactionAmountPositive
      ]}>
        {amount}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 2,
  },
  userSubtext: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffd06bff',
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  balanceItem: {
    flex: 1,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  expenseLabel: {
    fontSize: 11,
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  expenseAmount: {
    fontSize: 20,
  },
  percentageText: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.7,
    marginTop: 2,
  },
  goalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  goalText: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  accountCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  accountIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  accountAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  accountDetails: {
    marginBottom: 15,
  },
  accountDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  accountDetailText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
  accountDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  actionButtons: {
    marginTop: 10,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  smallButton: {
    flex: 1,
  },
  addButton: {
    width: 60,
  },
  transactionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  transactionAmountPositive: {
    color: '#4CAF50',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

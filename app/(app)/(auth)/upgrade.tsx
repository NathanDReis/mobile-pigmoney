import {
  CustomButton,
} from '@/components';
import { colors } from '@/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function UpgradeAccount() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade Premium',
      'Funcionalidade de pagamento em desenvolvimento',
      [
        {
          text: 'OK',
          onPress: () => console.log('Upgrade cancelado'),
        },
      ]
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  const features = [
    {
      icon: 'trending-up',
      title: 'Relatórios Avançados',
      description: 'Análises detalhadas das suas finanças',
    },
    {
      icon: 'notifications',
      title: 'Alertas Personalizados',
      description: 'Notificações sobre seus gastos e metas',
    },
    {
      icon: 'cloud-upload',
      title: 'Backup em Nuvem',
      description: 'Seus dados sempre seguros e sincronizados',
    },
    {
      icon: 'pie-chart',
      title: 'Gráficos Exclusivos',
      description: 'Visualizações premium dos seus dados',
    },
    {
      icon: 'attach-money',
      title: 'Sem Limites',
      description: 'Transações e categorias ilimitadas',
    },
    {
      icon: 'support',
      title: 'Suporte Prioritário',
      description: 'Atendimento exclusivo e rápido',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Logo/Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.crownContainer}>
          <MaterialIcons name="workspace-premium" size={60} color={colors.primary} />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Upgrade para Premium</Text>
      <Text style={styles.subtitle}>
        Desbloqueie recursos exclusivos e tenha controle total das suas finanças
      </Text>

      {/* Plan Selection */}
      <View style={styles.planContainer}>
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'monthly' && styles.planCardActive,
          ]}
          onPress={() => setSelectedPlan('monthly')}
        >
          <View style={styles.planHeader}>
            <Text style={[
              styles.planTitle,
              selectedPlan === 'monthly' && styles.planTitleActive,
            ]}>
              Mensal
            </Text>
            {selectedPlan === 'monthly' && (
              <MaterialIcons name="check-circle" size={24} color={colors.primary} />
            )}
          </View>
          <Text style={[
            styles.planPrice,
            selectedPlan === 'monthly' && styles.planPriceActive,
          ]}>
            R$ 19,90
          </Text>
          <Text style={styles.planPeriod}>por mês</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'annual' && styles.planCardActive,
          ]}
          onPress={() => setSelectedPlan('annual')}
        >
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>ECONOMIZE 40%</Text>
          </View>
          <View style={styles.planHeader}>
            <Text style={[
              styles.planTitle,
              selectedPlan === 'annual' && styles.planTitleActive,
            ]}>
              Anual
            </Text>
            {selectedPlan === 'annual' && (
              <MaterialIcons name="check-circle" size={24} color={colors.primary} />
            )}
          </View>
          <Text style={[
            styles.planPrice,
            selectedPlan === 'annual' && styles.planPriceActive,
          ]}>
            R$ 143,90
          </Text>
          <Text style={styles.planPeriod}>por ano (R$ 11,99/mês)</Text>
        </TouchableOpacity>
      </View>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>O que você vai ganhar:</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <MaterialIcons
                name={feature.icon as any}
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Upgrade Button */}
      <CustomButton
        onPress={handleUpgrade}
        title={`Assinar ${selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}`}
      />

      {/* Terms */}
      <Text style={styles.terms}>
        Ao assinar, você concorda com nossos{' '}
        <Text style={styles.link}>Termos de Serviço</Text> e{' '}
        <Text style={styles.link}>Política de Cancelamento</Text>
      </Text>

      {/* Decorative Wave */}
      <View style={styles.waveContainer}>
        <View style={styles.wave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  crownContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  planContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  planCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  badge: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  planTitleActive: {
    color: colors.text,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  planPriceActive: {
    color: colors.primary,
  },
  planPeriod: {
    fontSize: 12,
    color: '#999',
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  terms: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    transform: [{ scaleX: 2 }],
  },
});
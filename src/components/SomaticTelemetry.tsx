/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Gauge, 
  RefreshCw, 
  Heart, 
  Info 
} from 'lucide-react';

interface TelemetryPoint {
  week: number;
  value: number;
  annotation: string;
  metricLabel: string;
  unit: string;
}

interface MetricSet {
  name: string;
  key: string;
  unit: string;
  color: string;
  icon: any;
  points: TelemetryPoint[];
  baseline: number;
  target: number;
  safetyIndex: string;
}

const TELEMETRY_DATA: Record<'strength' | 'pilates' | 'recovery' | 'classes', MetricSet[]> = {
  strength: [
    {
      name: 'Dynamic Torque Output',
      key: 'torque',
      unit: 'Nm',
      color: '#ff2e2e',
      icon: Zap,
      baseline: 220,
      target: 380,
      safetyIndex: '98.5% Safe Orthopedic Profile',
      points: [
        { week: 2, value: 240, annotation: 'CNS assessment cleared. Joint shear vectors nominal. No patellar tracking degradation. Baseline loading confirmed.', metricLabel: 'Baseline Torque', unit: 'Nm' },
        { week: 4, value: 265, annotation: 'Intermediate overload phase. Cartilage deflection indexes tracked within optimal 0.2mm thresholds.', metricLabel: 'Intermediate Load', unit: 'Nm' },
        { week: 6, value: 285, annotation: 'Volume adaptation peak. Eccentric phase motor unit firing increased by 14%. Neural drive hyper-firing observed.', metricLabel: 'Volume Peak', unit: 'Nm' },
        { week: 8, value: 310, annotation: 'Myofibrillar tension threshold passed. Patellar and patellofemoral pressure vectors balanced. Deliberate mechanical stress.', metricLabel: 'Tension Max', unit: 'Nm' },
        { week: 10, value: 345, annotation: 'High-torque adaptation. Dynamic stabilization of hip and ankle stabilizers limits spinal compression metrics.', metricLabel: 'Stabilized Peak', unit: 'Nm' },
        { week: 12, value: 370, annotation: 'Somatic limit achievement. Absolute neurological recruitment ceiling established. Orthopedic margin maintained perfectly.', metricLabel: 'Somatic Limit', unit: 'Nm' },
      ]
    },
    {
      name: 'Neural Firing Co-Activation',
      key: 'neural',
      unit: '%',
      color: '#ffaf00',
      icon: Cpu,
      baseline: 65,
      target: 95,
      safetyIndex: '100% CNS Neural Integrity',
      points: [
        { week: 2, value: 72, annotation: 'Skeletal recruitment rate is low due to movement pattern compensations. Neural drive isolated to major muscle bellies.', metricLabel: 'Recruitment Min', unit: '%' },
        { week: 4, value: 76, annotation: 'Inter-muscular coordination patterns stabilizing. Synergistic helper muscles exhibit reduced wasteful firing.', metricLabel: 'Synergy Baseline', unit: '%' },
        { week: 6, value: 81, annotation: 'Rate coding modifications active. Peak motor recruitment speed accelerated. Joint stability markers optimized.', metricLabel: 'Coding Shift', unit: '%' },
        { week: 8, value: 85, annotation: 'High threshold motor unit activation sustained over extended 4-second loading times.', metricLabel: 'Threshold Drive', unit: '%' },
        { week: 10, value: 91, annotation: 'Synchronous firing efficiency achieved. Reflexive spinal circuits taking over stabilizers. Torque output maximized.', metricLabel: 'Spinal Synch', unit: '%' },
        { week: 12, value: 94, annotation: 'Absolute neuromuscular adaptation. Absolute structural motor compliance reached safely.', metricLabel: 'Recruitment Ceiling', unit: '%' },
      ]
    },
    {
      name: 'CNS Fatigue Mitigation',
      key: 'cns',
      unit: '/10',
      color: '#2effb1',
      icon: Activity,
      baseline: 9.0,
      target: 4.0,
      safetyIndex: 'Safe Heart Rate Variability Range',
      points: [
        { week: 2, value: 8.4, annotation: 'High initial systemic load. Systemic fatigue spikes post high-threshold neural sessions. Standard early adaptation behavior.', metricLabel: 'Max Fatigue', unit: '/10' },
        { week: 4, value: 7.0, annotation: 'Early vagal compensation notes improved deep-sleep recovery cycles. Neurotransmitter baseline stabilizing.', metricLabel: 'Early Adaptation', unit: '/10' },
        { week: 6, value: 7.8, annotation: 'Fatigue bounce due to heavy load volume phase. Autonomic nervous system balanced via scheduled cold recovery baths.', metricLabel: 'Load Peak Bounce', unit: '/10' },
        { week: 8, value: 6.2, annotation: 'Systemic resistance built up. Body handles high mechanical tension with 40% less systemic cortisol indicators.', metricLabel: 'Cortisol Suppression', unit: '/10' },
        { week: 10, value: 5.0, annotation: 'Neurological efficiency limits fatigue. Reflex pathways adapt to heavy joint loading without central depletion.', metricLabel: 'Adaptation Mastery', unit: '/10' },
        { week: 12, value: 4.5, annotation: 'Elite level adaptation. Neurological pathways handle maximal load with negligible systemic CNS residue.', metricLabel: 'Optimal CNS Vigor', unit: '/10' },
      ]
    }
  ],
  pilates: [
    {
      name: 'Glenohumeral Outer Rotation',
      key: 'gleno',
      unit: '°',
      color: '#ff2e2e',
      icon: Gauge,
      baseline: 60,
      target: 95,
      safetyIndex: 'Elastic Joint Preservation Active',
      points: [
        { week: 2, value: 65, annotation: 'Subscapularis tightening noted. Fascial restrictions around anterior glenohumeral capsule. Impingement margin narrow.', metricLabel: 'Restricted Range', unit: '°' },
        { week: 4, value: 70, annotation: 'Slight anterior capsule release. Safe eccentrics on timber reformer suites. Postural realignment noted.', metricLabel: 'Initial Decompress', unit: '°' },
        { week: 6, value: 74, annotation: 'Scapulohumeral rhythm dynamic testing indicates symmetric shoulder blade rotation. Clavicle tracking cleared.', metricLabel: 'Rhythm Correction', unit: '°' },
        { week: 8, value: 81, annotation: 'Rotator cuff passive tension decreased: sub-acromial space opened by 1.8mm. Elastic tissue elasticity optimal.', metricLabel: 'Acromial Release', unit: '°' },
        { week: 10, value: 88, annotation: 'High range mobility achievement. Thoracic spinal extension alignment assists lateral rotation metrics.', metricLabel: 'Thoracic Cleared', unit: '°' },
        { week: 12, value: 92, annotation: 'Perfect structural rotation symmetry. Humeral head centers without tracking errors during isometric rotation.', metricLabel: 'Anatomical Symmetry', unit: '°' },
      ]
    },
    {
      name: 'Hip Acetabular Decompression',
      key: 'hip',
      unit: 'mm',
      color: '#ffaf00',
      icon: ShieldCheck,
      baseline: 11.5,
      target: 15.5,
      safetyIndex: 'Fluid Synovial Joint Clearance',
      points: [
        { week: 2, value: 12.0, annotation: 'Tight hip flexor complex causing posterior acetabular glide. Cartilage mechanical compression indices monitored closely.', metricLabel: 'Impact Baseline', unit: 'mm' },
        { week: 4, value: 12.7, annotation: 'Psoas myofascial decompression. Early space elongation achieved through static resistance load sequences.', metricLabel: 'Psoas Decompress', unit: 'mm' },
        { week: 6, value: 13.4, annotation: 'Acetabular joint clearance tracking showing 12% improvement. Reduced dynamic impingement potential at deep load.', metricLabel: 'Clearance Progress', unit: 'mm' },
        { week: 8, value: 14.1, annotation: 'Pelvic tilt realigned. Lower spine shear forces dropped by 30%. Deep gluteal stabilizers optimized.', metricLabel: 'Pelvis Symmetry', unit: 'mm' },
        { week: 10, value: 14.9, annotation: 'Dynamic range of translation in hip joint sockets cleared. Squat mechanical translation vectors improved.', metricLabel: 'Joint Freedom', unit: 'mm' },
        { week: 12, value: 15.3, annotation: 'Unrestricted acetabular space. Deep hip sockets decompression and spinal alignment fully integrated.', metricLabel: 'Optimal Articulation', unit: 'mm' },
      ]
    },
    {
      name: 'Fascial Elastic Storage Rate',
      key: 'fascia',
      unit: 'J/rad',
      color: '#2effb1',
      icon: TrendingUp,
      baseline: 1.8,
      target: 5.0,
      safetyIndex: 'High Tendon Recoil Return Rate',
      points: [
        { week: 2, value: 2.1, annotation: 'High muscle stiffness; low fascial elastic contribution. Energy dissipation occurs via structural force damping.', metricLabel: 'Rigid Fastening', unit: 'J/rad' },
        { week: 4, value: 2.6, annotation: 'Myofascial crosslink restrictions showing soft dissolution. Linear tissue compliance improvements cataloged.', metricLabel: 'Compliance Gain', unit: 'J/rad' },
        { week: 6, value: 3.2, annotation: 'Collagen fiber alignment transitioning to linear. Kinetic load transfer is 18% quicker inside structural chain.', metricLabel: 'Collagen Shift', unit: 'J/rad' },
        { week: 8, value: 3.9, annotation: 'Tendon spring-mass simulation confirms athletic reflex gains. Highly responsive structural load buffering.', metricLabel: 'Kinetic Springing', unit: 'J/rad' },
        { week: 10, value: 4.4, annotation: 'Fascial matrix tensioning balances muscle loads. Peak recoil efficiency reduces joint muscle fatigue indices.', metricLabel: 'Recoil Balance', unit: 'J/rad' },
        { week: 12, value: 4.8, annotation: 'Somatic spring mechanism achieved. Tendinous and fascial storage capacity maximized for instant torque conversion.', metricLabel: 'Master Recoil', unit: 'J/rad' },
      ]
    }
  ],
  recovery: [
    {
      name: 'Vagal Acceleration Speed',
      key: 'vagal',
      unit: 'dB/s',
      color: '#ff2e2e',
      icon: Heart,
      baseline: 1.0,
      target: 5.5,
      safetyIndex: 'High Autonomic Balance Ratio',
      points: [
        { week: 2, value: 1.3, annotation: 'Post-workout sympathetic shock state. Parasympathetic nervous system slow to engage; HRV balance delayed.', metricLabel: 'Shock Phase', unit: 'dB/s' },
        { week: 4, value: 2.0, annotation: 'Thermal contrast adaptiveness begins. Vasoconstriction rates post cold plunge accelerating.', metricLabel: 'Vascular Rhythm', unit: 'dB/s' },
        { week: 6, value: 2.6, annotation: 'Sub-occipital nerve response optimization. Baroreceptor reflex sensitivity enhanced via contrast sequences.', metricLabel: 'Baro Reflex', unit: 'dB/s' },
        { week: 8, value: 3.5, annotation: 'Adrenaline clearing rates increased. Vagal activation trigger occurs in under 90 seconds post active stressors.', metricLabel: 'Rapid Clearance', unit: 'dB/s' },
        { week: 10, value: 4.3, annotation: 'Autonomic nervous system elasticity mastered. Vagal tone acceleration index shows 3x improvement from baseline.', metricLabel: 'Vagal Elasticity', unit: 'dB/s' },
        { week: 12, value: 5.2, annotation: 'Maximum parasympathetic adaptation. Heart rate metrics stabilize immediately upon cold stimuli activation.', metricLabel: 'Vagal Master', unit: 'dB/s' },
      ]
    },
    {
      name: 'Heart Rate Recovery (HRR-60s)',
      key: 'hrr',
      unit: 'BPM',
      color: '#ffaf00',
      icon: Activity,
      baseline: 28,
      target: 65,
      safetyIndex: 'Optimal Cardiac Output Index',
      points: [
        { week: 2, value: 31, annotation: 'Cardiac recovery decelerated due to lower resting vagal node stimulation. Sympathetic activity dominant.', metricLabel: 'Sluggish Baseline', unit: 'BPM' },
        { week: 4, value: 37, annotation: 'Early stroke volume adjustment. Blood pressure returns to nominal levels 15% faster after maximal exertion.', metricLabel: 'Pressure Control', unit: 'BPM' },
        { week: 6, value: 44, annotation: 'Nervous tone adaptation. Active cardiac recovery showing systematic acceleration. Internal body temp stabilization cleared.', metricLabel: 'CNS Adaptation', unit: 'BPM' },
        { week: 8, value: 50, annotation: 'Capillary pathways show increased recruitment efficiency. Local micro-vascular pooling mitigated.', metricLabel: 'Capillary Expand', unit: 'BPM' },
        { week: 10, value: 56, annotation: 'Left ventricular diastolic filling rate optimized. Dynamic stroke parameters cleared under physical stress.', metricLabel: 'Volume Peak', unit: 'BPM' },
        { week: 12, value: 62, annotation: 'Elite dynamic cardiovascular efficiency. Heart rate returns to vagal rest states instantaneously inside the dome.', metricLabel: 'Cardio Dominant', unit: 'BPM' },
      ]
    },
    {
      name: 'Myofascial Inflammatory Index',
      key: 'inflammatory',
      unit: 'pg/dL',
      color: '#2effb1',
      icon: Info,
      baseline: 50,
      target: 5,
      safetyIndex: 'Ultra-low Tissue Stress Index',
      points: [
        { week: 2, value: 46, annotation: 'High localized tissue acidosis and micro-tears. Interleukin indices high. Connective tissue load peak baseline.', metricLabel: 'Inflamed Baseline', unit: 'pg/dL' },
        { week: 4, value: 39, annotation: 'Lymphatic drainage markers indicate systemic optimization. Myofascial stiffness decreased slightly.', metricLabel: 'Drainage Gain', unit: 'pg/dL' },
        { week: 6, value: 27, annotation: 'Systemic cellular waste clearance accelerated via thermal saunas and active circulation protocols.', metricLabel: 'Thermal Sweep', unit: 'pg/dL' },
        { week: 8, value: 19, annotation: 'Cellular recovery rates peaking. Micro-tears undergo reconstruction without chronic inflammatory loops.', metricLabel: 'Fascial Vigor', unit: 'pg/dL' },
        { week: 10, value: 12, annotation: 'Intracellular oxidative markers reduced by 75%. Rapid recovery and reduction in delayed onset sore muscles.', metricLabel: 'Oxidative Clear', unit: 'pg/dL' },
        { week: 12, value: 6, annotation: 'Almost zero systematic residue. Myofascial fibers fully reconstructed, displaying extreme fluid elasticity.', metricLabel: 'Pristine Matrix', unit: 'pg/dL' },
      ]
    }
  ],
  classes: [
    {
      name: 'Lactate Threshold Output',
      key: 'lactate',
      unit: 'W',
      color: '#ff2e2e',
      icon: Zap,
      baseline: 175,
      target: 340,
      safetyIndex: 'High Aerobic Conversion Efficiency',
      points: [
        { week: 2, value: 185, annotation: 'Glycolytic enzyme saturation occurred quickly. Rapid hydrogen ion buildup locks active biomechanics.', metricLabel: 'Acidity Trigger', unit: 'W' },
        { week: 4, value: 212, annotation: 'Mitochondrial oxygen utilization efficiency optimization. Cellular transport of lactate starting to adapt.', metricLabel: 'Cellular Shift', unit: 'W' },
        { week: 6, value: 240, annotation: 'Systemic alkaline reserves increased by 15%. Body delay-triggers muscular lockout thresholds under torque.', metricLabel: 'Alkaline Shield', unit: 'W' },
        { week: 8, value: 272, annotation: 'Maximum structural endurance workload shift. High muscle respiration balance limits rapid glycogen depletion.', metricLabel: 'Aerobic Dominance', unit: 'W' },
        { week: 10, value: 305, annotation: 'Lactate cleared and re-routed as direct cellular fuel source inside slow twitch muscle groups.', metricLabel: 'Fuel Recycling', unit: 'W' },
        { week: 12, value: 332, annotation: 'Maximum functional work output achieved without physical exhaustion. Steady performance indicators.', metricLabel: 'Master Threshold', unit: 'W' },
      ]
    },
    {
      name: 'VO2 Peak Aerobic Power',
      key: 'vo2',
      unit: 'mL/kg',
      color: '#ffaf00',
      icon: RefreshCw,
      baseline: 42.0,
      target: 58.0,
      safetyIndex: '99% Cardiac Reserve Checked',
      points: [
        { week: 2, value: 43.8, annotation: 'Mild lung volume adaptation constraint. Aerobic gas transfer restricted by posture imbalances.', metricLabel: 'Oxygen Restricted', unit: 'mL/kg' },
        { week: 4, value: 45.9, annotation: 'Thoracic expandability released. Lung elasticity and vascular transport adapt to heavy metabolic loops.', metricLabel: 'Thoracic Space', unit: 'mL/kg' },
        { week: 6, value: 48.2, annotation: 'Alveolar transport metrics showing positive progression. Carbon dioxide unloading rates accelerated.', metricLabel: 'Alveolar Mastery', unit: 'mL/kg' },
        { week: 8, value: 51.5, annotation: 'Red blood cell oxygen integration coefficient stabilized. Aerobic energy conversion pathways peak.', metricLabel: 'Vascular Gain', unit: 'mL/kg' },
        { week: 10, value: 54.8, annotation: 'Mitochondrial cellular density indices indicate substantial peripheral tissue oxygen absorption capacity.', metricLabel: 'Peripheral Vigor', unit: 'mL/kg' },
        { week: 12, value: 57.2, annotation: 'Maximum systemic oxygen transport achieved. Absolute respiratory and cellular realignments successful.', metricLabel: 'Aerobic Master', unit: 'mL/kg' },
      ]
    },
    {
      name: 'Glycogen Splitting Capacity',
      key: 'glycogen',
      unit: '%',
      color: '#2effb1',
      icon: Gauge,
      baseline: 100,
      target: 140,
      safetyIndex: 'Optimal Insulin Metabolic Response',
      points: [
        { week: 2, value: 102, annotation: 'Limited dynamic glycogen storage in targeted myofibrillar chains. Depletion occurs inside 35 minutes.', metricLabel: 'Storage Minimum', unit: '%' },
        { week: 4, value: 108, annotation: 'Early supercompensation adaptation patterns observed inside fast twitch muscle tissue groups.', metricLabel: 'Compensation Start', unit: '%' },
        { week: 6, value: 114, annotation: 'Lactate adaptation reduces early metabolic depletion, preserving glycogen stores for peak explosive sets.', metricLabel: 'Preservation Gain', unit: '%' },
        { week: 8, value: 121, annotation: 'High-density cellular glucose transporters upgraded. Rapid load filling observed following contrast pools.', metricLabel: 'Glucose Upgrades', unit: '%' },
        { week: 10, value: 130, annotation: 'Peak adaptation storage reached. Active endurance capacity expanded to 90 minutes of continuous load.', metricLabel: 'Sustained Output', unit: '%' },
        { week: 12, value: 137, annotation: 'Super-compensation storage threshold accomplished. Hyper-hydration structural compliance is extremely high.', metricLabel: 'Somatic Reserve Peak', unit: '%' },
      ]
    }
  ]
};

interface SomaticTelemetryProps {
  activeCategory: 'strength' | 'pilates' | 'recovery' | 'classes';
}

export default function SomaticTelemetry({ activeCategory }: SomaticTelemetryProps) {
  const metricSets = useMemo(() => {
    return TELEMETRY_DATA[activeCategory] || TELEMETRY_DATA.strength;
  }, [activeCategory]);

  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number>(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(5); // Default to Week 12 (last point)
  const [isSimulating, setIsSimulating] = useState(false);

  // Active Metric parameters
  const activeMetric = useMemo(() => {
    return metricSets[selectedMetricIndex] || metricSets[0];
  }, [metricSets, selectedMetricIndex]);

  const activePoint = useMemo(() => {
    return activeMetric.points[selectedWeekIndex] || activeMetric.points[5];
  }, [activeMetric, selectedWeekIndex]);

  // SVG coordinate projection logic (Standard mathematical projection)
  const svgWidth = 640;
  const svgHeight = 280;
  const paddingLeft = 55;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Max and Min for math scaling
  const minVal = useMemo(() => {
    const vals = activeMetric.points.map(p => p.value);
    const min = Math.min(...vals, activeMetric.baseline);
    return min - (min * 0.08); // Add spacing
  }, [activeMetric]);

  const maxVal = useMemo(() => {
    const vals = activeMetric.points.map(p => p.value);
    const max = Math.max(...vals, activeMetric.target);
    return max + (max * 0.08); // Add spacing
  }, [activeMetric]);

  // Compute coordinates for current active line
  const coordinates = useMemo(() => {
    return activeMetric.points.map((p, i) => {
      const x = paddingLeft + (i / (activeMetric.points.length - 1)) * chartWidth;
      const progressRatio = (p.value - minVal) / (maxVal - minVal);
      const y = paddingTop + chartHeight - (progressRatio * chartHeight);
      return { x, y, value: p.value, week: p.week };
    });
  }, [activeMetric, minVal, maxVal, chartWidth, chartHeight]);

  // Baseline and target horizontal line projections
  const baselineY = useMemo(() => {
    const ratio = (activeMetric.baseline - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight - (ratio * chartHeight);
  }, [activeMetric.baseline, minVal, maxVal, chartHeight]);

  const targetY = useMemo(() => {
    const ratio = (activeMetric.target - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight - (ratio * chartHeight);
  }, [activeMetric.target, minVal, maxVal, chartHeight]);

  // SVG line path string generator
  const linePath = useMemo(() => {
    if (coordinates.length === 0) return '';
    return coordinates.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, '');
  }, [coordinates]);

  // SVG area closed path string generator (under line glowing area)
  const areaPath = useMemo(() => {
    if (coordinates.length === 0) return '';
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    const baseLineH = paddingTop + chartHeight;
    return `${linePath} L ${last.x} ${baseLineH} L ${first.x} ${baseLineH} Z`;
  }, [coordinates, linePath, chartHeight]);

  // Simulated progress play triggering
  const triggerSimulatedDrive = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    for (let i = 0; i < 6; i++) {
      setSelectedWeekIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setIsSimulating(false);
  };

  // Human-readable labels
  const categoryHeaderMap = {
    strength: 'REINFORCED KINESIOTHERAPEUTICS',
    pilates: 'FRCF SKELETAL SYMMETRY',
    recovery: 'VAGAL AUTONOMIC ACCELERATION',
    classes: 'METABOLIC WORKLOAD THRESHOLDS'
  };

  const metricTypeIcon = activeMetric.icon;

  return (
    <div className="mt-16 sm:mt-24 bg-[#070707] border-2 border-white/10 p-6 sm:p-10 relative overflow-hidden group">
      
      {/* High precision aesthetic blueprint HUD lines around container */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff2e2e]/40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff2e2e]/40 pointer-events-none" />
      
      {/* HUD Watermark */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-500 tracking-widest hidden sm:block">
        OBSIDIAN LABS // VERIFIED CODES Active
      </div>

      <div className="flex flex-col xl:flex-row items-stretch justify-between gap-10">
        
        {/* Left Side: Interactive SVG telemetry plot (1-8 Columns equivalent) */}
        <div className="xl:col-span-8 flex-1 text-left">
          
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#ff2e2e] block uppercase font-bold animate-pulse">
              {categoryHeaderMap[activeCategory]}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <h3 className="text-2xl font-serif text-white uppercase tracking-tight font-black">
                Somatic Telemetry Board
              </h3>
              
              {/* Simulation triggers */}
              <button
                onClick={triggerSimulatedDrive}
                disabled={isSimulating}
                className={`px-4 py-1.5 border border-[#ff2e2e]/40 text-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-white transition-all text-[9px] uppercase tracking-widest font-mono rounded-none ${
                  isSimulating ? 'opacity-40 cursor-not-allowed animate-pulse' : 'cursor-pointer'
                }`}
              >
                {isSimulating ? 'SIMULATING RUN...' : 'SIMULATE 12-WEEK RUN'}
              </button>
            </div>
          </div>

          {/* Interactive Metric Sets Selector Tab Button Bar */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#0b0b0b] p-1 border border-white/5">
            {metricSets.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.key}
                  onClick={() => {
                    setSelectedMetricIndex(i);
                    setSelectedWeekIndex(5); // Default to Week 12
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer rounded-none flex-1 min-w-[140px] justify-center ${
                    selectedMetricIndex === i
                      ? 'bg-[#111] text-white border-b-2 border-[#ff2e2e] font-black'
                      : 'text-zinc-500 hover:text-white hover:bg-neutral-900/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#ff2e2e]" />
                  <span>{metric.name}</span>
                </button>
              );
            })}
          </div>

          {/* Core Interactive SVG Progress Plot Window */}
          <div className="bg-[#050505] border border-white/5 relative p-4 flex items-center justify-center select-none overflow-x-auto min-h-[300px]">
            
            {/* Fine grid scan indicators mimicking advanced lab telemetry */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full max-w-[640px] text-zinc-400 font-mono h-auto block"
            >
              <defs>
                {/* Hot gradients */}
                <linearGradient id="glowRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff2e2e" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#ff2e2e" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="glowAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffaf00" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#ffaf00" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="glowMint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2effb1" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#2effb1" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Main Background Horizontal Laser Rule Grid Y-Intervals */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + ratio * chartHeight;
                const valueLabel = Math.round(maxVal - ratio * (maxVal - minVal));
                return (
                  <g key={i} className="opacity-40">
                    <line 
                      x1={paddingLeft} 
                      y1={y} 
                      x2={svgWidth - paddingRight} 
                      y2={y} 
                      stroke="#ffffff" 
                      strokeWidth="0.5" 
                      strokeDasharray="4,4" 
                    />
                    <text 
                      x={paddingLeft - 10} 
                      y={y + 3} 
                      textAnchor="end" 
                      fontSize="9" 
                      fill="rgba(255, 255, 255, 0.45)"
                      className="font-bold font-mono"
                    >
                      {valueLabel}
                    </text>
                  </g>
                );
              })}

              {/* Bottom Week Ticks X-Intervals */}
              {coordinates.map((p, i) => (
                <text
                  key={i}
                  x={p.x}
                  y={svgHeight - paddingBottom + 18}
                  textAnchor="middle"
                  fontSize="9"
                  fill={selectedWeekIndex === i ? '#ff2e2e' : 'rgba(255, 255, 255, 0.45)'}
                  className={`font-mono font-bold transition-all duration-300`}
                >
                  WK 0{p.week}
                </text>
              ))}

              {/* Baseline Horizontal Dotted Guide (Steel Grey) */}
              <line
                x1={paddingLeft}
                y1={baselineY}
                x2={svgWidth - paddingRight}
                y2={baselineY}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="2,6"
              />
              <text 
                x={svgWidth - paddingRight - 6} 
                y={baselineY - 4} 
                textAnchor="end" 
                fontSize="8" 
                fill="rgba(229, 225, 216, 0.4)"
                className="font-mono uppercase font-bold tracking-widest"
              >
                BASELINE REF // {activeMetric.baseline}{activeMetric.unit}
              </text>

              {/* Target Goal Horizontal Dotted Guide (Bright Red / Target Tone) */}
              <line
                x1={paddingLeft}
                y1={targetY}
                x2={svgWidth - paddingRight}
                y2={targetY}
                stroke="#ff2e2e"
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeDasharray="3,3"
              />
              <text 
                x={svgWidth - paddingRight - 6} 
                y={targetY - 4} 
                textAnchor="end" 
                fontSize="8" 
                fill="#ff2e2e"
                className="font-mono uppercase font-bold tracking-widest text-[#ff2e2e] opacity-80"
              >
                SOMATIC GOAL // {activeMetric.target}{activeMetric.unit}
              </text>

              {/* Main Fading Neon Area Fill Under Curve */}
              <path
                d={areaPath}
                fill={
                  activeMetric.color === '#ff2e2e' ? 'url(#glowRed)' : 
                  activeMetric.color === '#ffaf00' ? 'url(#glowAmber)' : 'url(#glowMint)'
                }
                className="transition-all duration-1000 ease-in-out"
              />

              {/* Main Flow Path Curve of Raw Telemetry data */}
              <path
                d={linePath}
                fill="none"
                stroke={activeMetric.color}
                strokeWidth="3.5"
                strokeLinecap="square"
                className="transition-all duration-1000 ease-in-out"
              />

              {/* Glowing Interactive Week Node Circles */}
              {coordinates.map((p, i) => {
                const isSelected = selectedWeekIndex === i;
                return (
                  <g key={i} className="cursor-pointer">
                    {/* Transparent hover capture buffer layer for big touch sizes */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="16"
                      fill="transparent"
                      onClick={() => setSelectedWeekIndex(i)}
                      onMouseEnter={() => setSelectedWeekIndex(i)}
                      className="cursor-pointer"
                    />
                    
                    {/* Glowing outer aura rings on selected index */}
                    {isSelected && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="10"
                        fill="none"
                        stroke={activeMetric.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Concentric rings representing precise telemetry points */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected ? 6.5 : 4}
                      fill={isSelected ? '#050505' : activeMetric.color}
                      stroke={activeMetric.color}
                      strokeWidth={isSelected ? 3 : 0}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <div className="flex items-center space-x-2">
              <Info className="w-3.5 h-3.5 text-[#ff2e2e]" />
              <span>Hover or tap any week dot coordinate (W02 - W12) to audit the kinesiotherapy annotations.</span>
            </div>
            <span>SCALE: PROGRESSIVE LOAD</span>
          </div>

        </div>

        {/* Right Side: Biomechanical Calibration Desk (9-12 Columns equivalent) */}
        <div className="xl:w-[320px] shrink-0 bg-[#0b0b0b] border border-white/10 p-6 flex flex-col justify-between text-left relative z-10">
          
          <div className="space-y-6">
            <div>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#ff2e2e] font-bold block uppercase">
                CALIBRATION READOUT
              </span>
              <h4 className="text-xl font-serif text-white font-black uppercase mt-1 tracking-tight leading-none">
                Somatic Metrics
              </h4>
            </div>

            {/* Glowing Massive Live Value Stamp */}
            <div className="p-4 bg-neutral-950 border border-white/5 text-center relative overflow-hidden flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Week 0{activePoint.week} Value</span>
                <span className="text-4xl font-mono text-white font-black tracking-tight mt-1 inline-block">
                  {activePoint.value}
                </span>
                <span className="text-xl text-[#ff2e2e] font-mono ml-1">{activePoint.unit}</span>
              </div>

              {/* Percentage Increase relative to baseline */}
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Delta Increase</span>
                <span className="text-lg font-mono text-[#2effb1] font-bold block mt-1">
                  +{Math.round(((activePoint.value - activeMetric.baseline) / activeMetric.baseline) * 100)}%
                </span>
              </div>
            </div>

            {/* Tactical Grid Parameter logs */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="border border-white/5 p-2 bg-black/40">
                <span className="text-[9px] text-zinc-500 block">BASELINE REF</span>
                <span className="text-white font-bold block mt-0.5">{activeMetric.baseline} {activeMetric.unit}</span>
              </div>
              <div className="border border-white/5 p-2 bg-black/40">
                <span className="text-[9px] text-zinc-500 block">TARGET GOAL</span>
                <span className="text-white font-bold block mt-0.5">{activeMetric.target} {activeMetric.unit}</span>
              </div>
            </div>

            {/* Main Clinical Annotation commentary */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-[#ff2e2e] uppercase block font-bold">
                KINESIOLOGIST FEEDBACK
              </span>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-[#050505] p-3 border border-white/5 min-h-[140px]">
                {activePoint.annotation}
              </p>
            </div>
          </div>

          {/* Bottom Security / Orthopedic status */}
          <div className="border-t border-white/10 pt-4 mt-6">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#2effb1]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="font-bold uppercase tracking-wider">{activeMetric.safetyIndex}</span>
            </div>
            <p className="text-[9px] text-zinc-500 font-mono mt-1">
              Safety indices audited in-realtime through continuous torque sensors and telemetry trackers.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

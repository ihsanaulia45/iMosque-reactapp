
import React, { useState } from 'react';
import { Target, Heart, History, CreditCard, X, CheckCircle } from 'lucide-react';
import { DONATION_CAMPAIGNS, MOCK_DONATION_HISTORY } from '../constants';
import { DonationTransaction, DonationCampaign } from '../types';

const Donation: React.FC = () => {
  // View State
  const [activeTab, setActiveTab] = useState<'CAMPAIGNS' | 'HISTORY'>('CAMPAIGNS');
  
  // Controller State & Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  
  // In a real app, this would come from a Database/API
  const [history, setHistory] = useState<DonationTransaction[]>(MOCK_DONATION_HISTORY);

  // Controller Action: Create() - Open the modal
  const openDonateModal = (campaign: DonationCampaign) => {
    setSelectedCampaign(campaign);
    setDonationAmount('');
    setProcessSuccess(false);
    setIsModalOpen(true);
  };

  // Controller Action: Process() - Handle the logic
  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || !selectedCampaign) return;

    setIsProcessing(true);

    // Mock API Call / Payment Gateway
    setTimeout(() => {
      const newTransaction: DonationTransaction = {
        id: `TX-${Date.now()}`,
        campaignTitle: selectedCampaign.title,
        amount: parseInt(donationAmount),
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };

      // Update Model
      setHistory(prev => [newTransaction, ...prev]);
      
      // Update UI State
      setIsProcessing(false);
      setProcessSuccess(true);
      
      // Close after success message
      setTimeout(() => {
        setIsModalOpen(false);
        setActiveTab('HISTORY'); // Redirect to history to show result
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6 relative">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-slate-900">Sadaqah & Infaq</h2>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
            "The believer's shade on the Day of Resurrection will be his charity." - Al-Tirmidhi
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          onClick={() => setActiveTab('CAMPAIGNS')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'CAMPAIGNS' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Active Campaigns
        </button>
        <button 
           onClick={() => setActiveTab('HISTORY')}
           className={`px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center ${activeTab === 'HISTORY' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          <History size={16} className="mr-2" />
          My History
        </button>
      </div>

      {/* View: Campaigns */}
      {activeTab === 'CAMPAIGNS' && (
        <div className="grid gap-6 md:grid-cols-2">
          {DONATION_CAMPAIGNS.map(campaign => {
              const percentage = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

              return (
                  <div key={campaign.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase">
                              {campaign.category}
                          </span>
                          <Target size={18} className="text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{campaign.title}</h3>
                      <p className="text-sm text-slate-500 mb-6">Organized by {campaign.mosqueName}</p>

                      <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                              <span className="text-emerald-600">Rp {campaign.currentAmount.toLocaleString()}</span>
                              <span className="text-slate-400">of Rp {campaign.targetAmount.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <div className="text-right text-xs text-slate-400">{percentage}% Funded</div>
                      </div>

                      <button 
                        onClick={() => openDonateModal(campaign)}
                        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                      >
                          <Heart size={18} className="mr-2" />
                          Donate Now
                      </button>
                  </div>
              );
          })}
        </div>
      )}

      {/* View: History */}
      {activeTab === 'HISTORY' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Campaign</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-700">{tx.date}</td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">{tx.campaignTitle}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">Rp {tx.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                      No donation history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            {!processSuccess ? (
              <>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Donate to {selectedCampaign.category}</h3>
                  <p className="text-slate-500 text-sm mt-1">{selectedCampaign.title}</p>
                </div>

                <form onSubmit={handleProcessDonation} className="space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Enter Amount (Rp)</label>
                      <div className="relative">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                         <input 
                           type="number" 
                           className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-lg"
                           placeholder="100000"
                           min="10000"
                           value={donationAmount}
                           onChange={(e) => setDonationAmount(e.target.value)}
                           required
                         />
                      </div>
                   </div>

                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-2 uppercase font-bold">Payment Method</p>
                      <div className="flex items-center space-x-2 text-slate-700 font-medium">
                        <CreditCard size={20} />
                        <span>QRIS / Bank Transfer</span>
                      </div>
                   </div>

                   <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 disabled:opacity-70 flex items-center justify-center"
                   >
                     {isProcessing ? 'Processing...' : 'Confirm Donation'}
                   </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Alhamdulillah!</h3>
                <p className="text-slate-500 mt-2">Your donation has been received.</p>
                <p className="text-sm text-slate-400 mt-1">May Allah accept your good deeds.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;

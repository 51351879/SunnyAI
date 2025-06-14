'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchFilterProps {
  categories: string[];
  selectedCategory: string;
  onFilter: (category: string, searchTerm: string) => void;
}

const SearchFilter = ({ categories, selectedCategory, onFilter }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onFilter(selectedCategory, term);
  };

  const handleCategoryChange = (category: string) => {
    onFilter(category, searchTerm);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={t('common.search.placeholder')}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className={`
              ${selectedCategory === category 
                ? 'bg-[#17f700] text-black hover:bg-[#17f700]/90' 
                : 'hover:bg-[#17f700]/10 hover:text-[#17f700]'
              }
            `}
          >
            {selectedCategory === category && <Filter className="w-4 h-4 mr-1" />}
            {t(`common.category.${category}`)}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchFilter;
import { supabase } from './lib/supabase.js'

// 测试数据库连接
async function testConnection() {
  try {
    console.log('开始测试 Supabase 连接...')
    
    // 测试插入一条数据
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title: '测试博客',
          slug: 'test-blog',
          content: '这是一篇测试博客',
          status: 'draft'
        }
      ])
      .select()

    if (error) {
      console.error('错误:', error)
    } else {
      console.log('✅ 成功连接！插入的数据:', data)
      
      // 删除测试数据
      await supabase
        .from('blogs')
        .delete()
        .eq('slug', 'test-blog')
      
      console.log('✅ 测试完成，已清理测试数据')
    }
  } catch (err) {
    console.error('❌ 连接失败:', err)
  }
}

// 运行测试
testConnection()
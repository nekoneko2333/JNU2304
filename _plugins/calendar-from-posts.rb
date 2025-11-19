#!/usr/bin/env ruby
#
# 从博客的 front matter 中提取提醒日期，生成日历数据
# 使用方法：在博客的 front matter 中添加 reminder_date 字段
#
# 示例：
# ---
# title: "作业标题"
# reminder_date: 2025-12-21
# reminder_type: homework
# ---

module Jekyll
  class CalendarFromPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # 从所有博客中提取提醒日期，生成事件列表
      post_events = []
      
      site.posts.docs.each do |post|
        reminder_date = post.data['reminder_date']
        
        # 如果博客有提醒日期，生成事件数据
        if reminder_date
          begin
            date_obj = Date.parse(reminder_date.to_s)
            formatted_date = date_obj.strftime('%Y-%m-%d')
            
            # 构建事件数据
            event_data = {
              'date' => formatted_date,
              'event' => post.data['title'] || post.data['name'] || '未命名事件',
              'type' => post.data['reminder_type'] || 'homework',
              'link' => post.url ? "#{site.baseurl}#{post.url}" : nil,
              'linkTarget' => '_self'
            }
            
            post_events << event_data
          rescue ArgumentError => e
            Jekyll.logger.warn "CalendarFromPosts:", "无法解析提醒日期: #{reminder_date} (来自 #{post.path})"
          end
        end
      end
      
      # 将博客事件存储到站点数据中，供模板使用
      site.data['calendar_from_posts'] = post_events
    end
  end
end


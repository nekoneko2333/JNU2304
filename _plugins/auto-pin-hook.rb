#!/usr/bin/env ruby
#
# 自动置顶插件
# 功能：截止日期在一周内的文章自动置顶
# 特殊：标题包含"网站使用说明"的文章始终置顶

Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |post|
    # 网站使用说明始终置顶
    if post.data['title'] && post.data['title'].include?('网站使用说明')
      post.data['pin'] = true
      next
    end

    # 检查 reminder_date（截止日期）
    reminder_date = post.data['reminder_date']
    
    if reminder_date
      # 将 reminder_date 转换为 Date 对象
      begin
        if reminder_date.is_a?(Date) || reminder_date.is_a?(Time)
          deadline = reminder_date.to_date
        else
          deadline = Date.parse(reminder_date.to_s)
        end
        
        today = Date.today
        days_until_deadline = (deadline - today).to_i
        
        # 如果截止日期在未来7天内（含今天），自动置顶
        if days_until_deadline >= 0 && days_until_deadline <= 7
          post.data['pin'] = true
          Jekyll.logger.info "Auto-pin:", "置顶 #{post.data['title']} (截止: #{deadline}, 剩余#{days_until_deadline}天)"
        elsif days_until_deadline < 0 && !post.data['pin_permanent']
          # 已过期的自动取消置顶（除非设置了永久置顶）
          post.data['pin'] = false
        end
      rescue ArgumentError => e
        # 日期解析失败，跳过
        Jekyll.logger.warn "Auto-pin:", "无法解析日期 #{reminder_date}: #{e.message}"
      end
    end
  end
end

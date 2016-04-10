def format_line(line)
  line.gsub!('"', '\"')
  line.gsub!("\n", "")
  return "\"#{line}\\n\"+"
end
File.open('eq-armor.csv').each {|x| puts format_line(x) }
puts "============================"
File.open('eq-weapons.csv').each {|x| puts format_line(x) }
puts "============================"
File.open('eq-gear.csv').each {|x| puts format_line(x) }
puts "============================"
File.open('eq-mounts.csv').each {|x| puts format_line(x) }
puts "============================"
File.open('eq-cybernetics.csv').each {|x| puts format_line(x) }
puts "============================"
File.open('psionics.csv').each {|x| puts format_line(x) }

def format_line(line)
  line.gsub!('"', '\"''"')
  line.gsub!("\r\n", "")
  return "\"#{line}\\n\"+"
end
File.open('exploits.csv').each {|x| puts format_line(x) }
